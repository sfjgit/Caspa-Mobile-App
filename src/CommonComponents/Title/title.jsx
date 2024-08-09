/* eslint-disable react/prop-types */
import styles from "./title.module.scss";

const Title = ({ title, varriant }) => {
  return (
    <div>
      <div className={styles[varriant]}>{title}</div>
    </div>
  );
};

export default Title;
