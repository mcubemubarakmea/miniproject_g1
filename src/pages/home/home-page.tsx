import { Avatar, Button } from "@mui/material";
import styles from "./homeStyle.module.css";
// import { Post } from "./components/post/post";
// import { AddPost } from "./components/add-post/add-post";

export const Home = () => {
  return (
    <div className={styles.home}>
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
      <div className={styles.profile}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <h3>Name</h3>
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
    </div>
  );
};
