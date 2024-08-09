/* eslint-disable react/prop-types */
import styles from "./card.module.scss";

const Card = ({ children }) => {
  console.log(children);
  return <div className={styles.container}>{children}</div>;
};

export default Card;
