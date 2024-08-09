/* eslint-disable react/prop-types */
import styles from "./appbar.module.scss";

import Home from "../../assets/home.svg";
import Profile from "../../assets/profile.svg";
import Menu from "../../assets/menu.svg";

const Appbar = ({ handleOpen }) => {
  return (
    <div className={styles.appbarContainer}>
      <div className={styles.row}>
        <div className={styles.area}>
          <img src={Home} />
          <p>Home</p>
        </div>
        <div className={styles.area} onClick={handleOpen}>
          <img src={Menu} />
          <p>Menu</p>
        </div>
        <div className={styles.area}>
          <img src={Profile} />
          <p>Profile</p>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
