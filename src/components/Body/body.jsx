/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import styles from "./body.module.scss";

const Body = ({ component }) => {
  return <div className={styles.bodyContainer}>{component}</div>;
};

export default Body;
