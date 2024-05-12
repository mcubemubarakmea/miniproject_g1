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
          <div className={styles.homecntr}>
            <h3>Name</h3>
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
            <TextField
              sx={{ marginLeft: "10px" }}
              margin="normal"
              label="Full Name"
              name="fullname"
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
          </div>
        </>
      )}

      {user?.type === USER_TYPE.CONTRACTOR && (
        <>
          <p>contractorr</p>
        </>
      )}
    </div>
  );
};
