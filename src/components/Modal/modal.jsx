/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Close from "../../assets/close.svg";
import Title from "../../CommonComponents/Title/title";

import styles from "./modal.module.scss";
import { useEffect } from "react";

const Drawer = ({
  open,
  handleClose,
  title,
  id,
  handleApprove,
  setnotes,
  notes,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  console.log(notes);
  return (
    <>
      {isOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.overlay} />
          <div className={styles.modalWrap}>
            <div className={styles.row}>
              <div>
                <Title title={title} varriant="h1" />
              </div>
              <div>
                <img src={Close} width={30} onClick={handleClose} />
              </div>
            </div>
            <div className={styles.children}>{children}</div>
            <div className={styles.footer}>
              <label>
                Note<span className="text-error">*</span>
              </label>
              <textarea onChange={(e) => setnotes(e?.target?.value)} />
              <button
                className={`${styles.button} ${
                  (!notes || notes === null) && styles.disabled
                }`}
                onClick={() => handleApprove(id)}
                disabled={!notes || notes === null}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
