import { Avatar, Button } from "@mui/material";
import styles from "./style.module.css";
import { useAppDispatch } from "../../store/store";
import { logout } from "../../store/userSlice";

export const Header = () => {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <header className={styles.container}>
      <div className={styles.company}>
        <h1>Labor Link Connect</h1>
      </div>
      <Button onClick={handleLogout}>logout</Button>
      <div className={styles.profile}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <h3>Name</h3>
      </div>
    </header>
  );
};
