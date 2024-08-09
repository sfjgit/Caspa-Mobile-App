/* eslint-disable react/prop-types */
import styles from "./badge.module.scss";

const Title = ({ title, varriant }) => {
  return (
    <div>
      <div className={`${styles.badge} ${styles[varriant]}`}>{title}</div>
    </div>
  );
};

export default Title;
