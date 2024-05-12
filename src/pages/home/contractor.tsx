import { Alert, Button, Snackbar, TextField } from "@mui/material";
import styles from "./contractorStyle.module.css";
import { FormEvent, useEffect, useState } from "react";
import { FULL_NAME, JOB_DESCRIPION, PHONE_NUMBER } from "../../utils/regex";
import {
  createContratorPost,
  getContractorPost,
  updateContractorPost,
} from "../../firebase/firebaseConfig";
import { ContractorPost } from "../../utils/types";
import { useAppSelector } from "../../store/store";
import { selectUser } from "../../store/userSlice";

const API_STATUS = {
  LOADING: 1,
  SUCCESSFUL: 2,
  FAILED: 3,
  DOCS_NOT_EXIST: 4,
  IDLE: 5,
};

interface SnackbarDetails {
  open: boolean;
  message: string;
  severity: "warning" | "success" | "error";
}

export const Contractor = () => {
  const user = useAppSelector(selectUser);
  const [title, setTitle] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [description, setDescription] = useState("");
  const [labourCount, setLabourCount] = useState(0);
  const [snackbarDetails, setSnackBarDetails] = useState<SnackbarDetails>({
    open: false,
    message: "",
    severity: "warning",
  });
  const [currentUserPost, setCurrentUserPost] = useState<ContractorPost | null>(
    null
  );
  const [currentUserPostApiStatus, setCurrentUserPostApiStatus] = useState(
    API_STATUS.LOADING
  );
  const [updateContratorDetailsApiStatus, setUpdateContractorDetailsApiStatus] =
    useState(API_STATUS.IDLE);

  async function handleContractorDetailsUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (updateContratorDetailsApiStatus === API_STATUS.LOADING) return;

    if (!FULL_NAME.test(title)) {
      setSnackBarDetails({
        open: true,
        message: "Enter a valid title",
        severity: "warning",
      });
      return;
    } else if (!PHONE_NUMBER.test(phonenumber)) {
      setSnackBarDetails({
        open: true,
        message: "Enter a valid phone number",
        severity: "warning",
      });
      return;
    } else if (!JOB_DESCRIPION.test(description)) {
      setSnackBarDetails({
        open: true,
        message: "Description must consist of words separated by commas (,)",
        severity: "warning",
      });
      return;
    } else if (labourCount < 1) {
      setSnackBarDetails({
        open: true,
        message: "Minimum of 1 labor required",
        severity: "warning",
      });
      return;
    } else if (!user) {
      setSnackBarDetails({
        open: true,
        message: "Somthing went wrong, please try again later.",
        severity: "warning",
      });
      return;
    }

    try {
      setUpdateContractorDetailsApiStatus(API_STATUS.LOADING);
      if (currentUserPostApiStatus === API_STATUS.DOCS_NOT_EXIST) {
        await createContratorPost(
          user.id,
          title,
          phonenumber,
          description,
          labourCount
        );
      } else {
        await updateContractorPost(user.id, {
          title,
          phone: phonenumber,
          description,
          labourCount,
        });
      }
      const res = await getContractorPost(user.id);
      setCurrentUserPost(res);
      setTitle(res.title);
      setPhonenumber(res.phone);
      setDescription(res.description);
      setLabourCount(res.labourCount);
      setSnackBarDetails({
        open: true,
        message: "Details updated",
        severity: "success",
      });
      setUpdateContractorDetailsApiStatus(API_STATUS.SUCCESSFUL);
    } catch (error) {
      setUpdateContractorDetailsApiStatus(API_STATUS.FAILED);
      setSnackBarDetails({
        open: true,
        message: "Update Details failed",
        severity: "error",
      });
    }
  }

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const res = await getContractorPost(user.id);
          setCurrentUserPost(res);
          setTitle(res.title);
          setPhonenumber(res.phone);
          setDescription(res.description);
          setLabourCount(res.labourCount);
          setCurrentUserPostApiStatus(API_STATUS.SUCCESSFUL);
        } catch (error: any) {
          console.log(error, "currusererr");
          if (error.code === "empty") {
            setCurrentUserPostApiStatus(API_STATUS.DOCS_NOT_EXIST);
          } else {
            setCurrentUserPostApiStatus(API_STATUS.FAILED);
          }
        }
      })();
    }
  }, [user]);

  return (
    <>
      <div className={styles.contracterchange}>
        <h2>Enter your details</h2>
        <form onSubmit={handleContractorDetailsUpdate}>
          <TextField
            sx={{ marginLeft: "10px" }}
            margin="normal"
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            sx={{ marginLeft: "10px" }}
            margin="normal"
            label="Phone Number"
            name="phonenumber"
            type="tel"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          <TextField
            sx={{ marginLeft: "10px" }}
            margin="normal"
            label="Job Description"
            name="jobdescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            sx={{ marginLeft: "10px" }}
            margin="normal"
            label="Details of Workers"
            name="details"
            value={labourCount}
            type="number"
            onChange={(e) => setLabourCount(Number(e.target.value))}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {currentUserPostApiStatus === API_STATUS.DOCS_NOT_EXIST
              ? "Submit"
              : "Update"}{" "}
            Details
          </Button>
        </form>
      </div>
      <div className={styles.homecntr}>
        <h3>Customer Name</h3>
        <p>Details</p>
        <div className={styles.btnwrapper}>
          <Button
            sx={{
              color: "black",
              backgroundColor: "lightgreen",
              ":hover": { backgroundColor: "green" },
            }}
          >
            Accept
          </Button>
          <Button
            sx={{
              color: "black",
              backgroundColor: "#FF204E",
              marginLeft: "10px",
              ":hover": { backgroundColor: "red" },
            }}
          >
            Deny
          </Button>
        </div>
      </div>
      <Snackbar
        open={snackbarDetails.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackBarDetails({ open: false, message: "", severity: "warning" })
        }
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbarDetails.severity}>
          {snackbarDetails.message}
        </Alert>
      </Snackbar>
    </>
  );
};
