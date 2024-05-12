import { Button } from "@mui/material";
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
      <div>header</div>
      <Button onClick={handleLogout}>logout</Button>
    </header>
  );
};
