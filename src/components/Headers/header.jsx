/* eslint-disable react/prop-types */
import styles from "./header.module.scss";
import Menu from "../../assets/menu-primary.png";
import Logo from "../../assets/logo.png";
import Back from "../../assets/backarrow.png";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ handleOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logobar}>
        <div className={styles.backarea}>
          {location?.pathname !== "/dashboard" && (
            <div className={styles.hamburger} onClick={() => navigate(-1)}>
              <img src={Back} width={14} />
            </div>
          )}
          <div className={styles.logo}>
            <img src={Logo} width={80} />
          </div>
        </div>
        <div className={styles.hamburger} onClick={handleOpen}>
          <img src={Menu} width={18} />
        </div>
      </div>
    </div>
  );
};

export default Header;
