import { Button, TextField } from "@mui/material";
import styles from "./homeStyle.module.css";
import { useAppSelector } from "../../store/store";
import { selectUser } from "../../store/userSlice";

const USER_TYPE = {
  CUSTOMER: 1,
  CONTRACTOR: 2,
};

export const Home = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className={styles.home}>
      {user?.type === USER_TYPE.CUSTOMER && (
        <>
          <div className={styles.box1}>
            <h3>Name</h3>
            <h4>Job description</h4>
            <p>Details</p>
            <div className={styles.btnwrapper}>
              <Button
                sx={{
                  color: "black",
                  backgroundColor: "#48cae4",
                  ":hover": { backgroundColor: "#00b4d8" },
                }}
              >
                Request
              </Button>
            </div>
          </div>
        </>
      )}

      {user?.type === USER_TYPE.CONTRACTOR && (
        <>
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
          <div className={styles.contracterchange}>
            <h2>Enter your details</h2>
            <TextField
              sx={{ marginLeft: "10px" }}
              margin="normal"
              label="Title"
              name="title"
            />
            <TextField
              sx={{ marginLeft: "10px" }}
              margin="normal"
              label="Phone Number"
              name="phonenumber"
            />
            <TextField
              sx={{ marginLeft: "10px" }}
              margin="normal"
              label="Job Description"
              name="jobdescription"
            />
            <TextField
              sx={{ marginLeft: "10px" }}
              margin="normal"
              label="Details of Workers"
              name="details"
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
        </>
      )}
    </div>
  );
};
