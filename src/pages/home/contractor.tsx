import { Button, TextField } from "@mui/material";
import styles from "./contractorStyle.module.css";

export const Contractor = () => {
  return (
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
  );
};
