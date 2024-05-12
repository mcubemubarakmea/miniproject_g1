import { Alert, Button, Snackbar, TextField } from "@mui/material";
import styles from "./contractorStyle.module.css";
import { useState } from "react";

export const Contractor = () => {
  const [title, setTitle] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [description, setDescription] = useState("");
  const [labourCount, setLabourCount] = useState(0);
  const [snackbarDetails, setSnackBarDetails] = useState({
    open: false,
    message: "",
  });

  return (
    <>
      <div className={styles.contracterchange}>
        <h2>Enter your details</h2>
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
          Submit Details
        </Button>
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
        onClose={() => setSnackBarDetails({ open: false, message: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="warning">{snackbarDetails.message}</Alert>
      </Snackbar>
    </>
  );
};
