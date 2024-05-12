import { Button } from "@mui/material";
import styles from "./customerStyle.module.css";

export const Customer = () => {
  return (
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
  );
};
