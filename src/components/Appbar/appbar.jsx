/* eslint-disable react/prop-types */
import Cookies from "universal-cookie";
import styles from "./appbar.module.scss";

import Home from "../../assets/home.svg";
import Profile from "../../assets/profile.svg";
import Menu from "../../assets/menu.svg";
import { useNavigate } from "react-router-dom";

const Appbar = ({ handleOpen }) => {
  const cookie = new Cookies();

  const navigate = useNavigate();

  const handleLogout = () => {
    cookie.remove("token", { path: "/" });
    navigate("/");
  };
  return (
    <div className={styles.appbarContainer}>
      <div className={styles.row}>
        <div className={styles.area}>
          <img src={Home} onClick={() => navigate("/dashboard")} />
          <p>Home</p>
        </div>
        <div className={styles.area} onClick={handleOpen}>
          <img src={Menu} />
          <p>Menu</p>
        </div>
        <div className={styles.area} onClick={() => handleLogout()}>
          <img src={Profile} />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
