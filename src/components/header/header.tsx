import { Avatar, Button } from "@mui/material";
import styles from "./style.module.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { logout, selectUser, selectUserApiStatus } from "../../store/userSlice";
import AnoProfileImg from "../../images/ano_profile.png";

export const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userApiStatus = useAppSelector(selectUserApiStatus);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <header className={styles.container}>
      <div className={styles.company}>
        <h1>Labor Link Connect</h1>
      </div>
      <Button onClick={handleLogout}>logout</Button>
      {userApiStatus === "successfull" && user && (
        <div className={styles.profile}>
          <Avatar alt="Remy Sharp" src={AnoProfileImg} />
          <h3>{user.name}</h3>
        </div>
      )}
    </header>
  );
};
