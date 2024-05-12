import { Button, CircularProgress } from "@mui/material";
import styles from "./customerStyle.module.css";
import { useEffect, useState } from "react";
import { ContractorPost } from "../../utils/types";
import { getAllContractorPost } from "../../firebase/firebaseConfig";

const API_STATUS = {
  IDLE: 1,
  LOADING: 2,
  FAILED: 3,
  SUCCESS: 4,
};

export const Customer = () => {
  const [allPost, setAllPost] = useState<ContractorPost[]>([]);
  const [allPostApiStatus, setAllPostApiStatus] = useState(API_STATUS.LOADING);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllContractorPost();
        setAllPost(res);
        setAllPostApiStatus(API_STATUS.SUCCESS);
      } catch (error) {
        setAllPostApiStatus(API_STATUS.FAILED);
      }
    })();
  }, []);
  return (
    <>
      {allPostApiStatus === API_STATUS.LOADING && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}

      {allPostApiStatus === API_STATUS.SUCCESS &&
        allPost.map((item) => (
          <div
            key={item.id}
            className={styles.box1}
            style={{ marginBottom: "10px" }}
          >
            <h3>{item.title}</h3>
            <h4>{item.description}</h4>
            <p>Labours: {item.labourCount}</p>
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
        ))}
    </>
  );
};
