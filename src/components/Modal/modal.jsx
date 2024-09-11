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
  isApprove = true,
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
            <div
              className={isApprove ? styles.childrenapprove : styles.children}
            >
              {children}
            </div>
            {isApprove && (
              <div className={styles.footer}>
                <div>
                  <label>Note:</label>
                </div>
                <textarea onChange={(e) => setnotes(e?.target?.value)} />
                <div className="grid gap-5 w-full grid-flow-col auto-cols-max">
                  <button
                    className={`${styles.button}`}
                    onClick={() => handleApprove(id, "Approve")}
                    // disabled={!notes || notes === null}
                  >
                    Approve
                  </button>

                  <button
                    className={`${styles.button} ${styles.rejectbutton}`}
                    onClick={() => handleApprove(id, "Reject")}
                    // disabled={!notes || notes === null}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
