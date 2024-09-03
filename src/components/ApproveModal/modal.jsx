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
  isInteview,
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
          <div
            className={`${styles.modalWrap} ${
              isInteview ? styles.modalwrapmaximum : styles.modalwrapminimum
            }`}
          >
            <div className={styles.row}>
              <div>
                <Title title={title} varriant="h1" />
              </div>
              <div>
                <img src={Close} width={30} onClick={handleClose} />
              </div>
            </div>
            {/* <div
              className={styles.children}
            >
              {children}
            </div> */}

            <div className={styles.footer}>
              <label>
                Note<span className="text-error">*</span>
              </label>

              <textarea onChange={(e) => setnotes(e?.target?.value, "notes")} />
              {isInteview && (
                <>
                  <label>Note 2</label>
                  <textarea
                    onChange={(e) => setnotes(e?.target?.value, "notes1")}
                  />
                  <label>Note 3</label>
                  <textarea
                    onChange={(e) => setnotes(e?.target?.value, "notes2")}
                  />
                  <label>Note 4</label>
                  <textarea
                    onChange={(e) => setnotes(e?.target?.value, "notes3")}
                  />
                  <label>Note 5</label>
                  <textarea
                    onChange={(e) => setnotes(e?.target?.value, "notes4")}
                  />
                </>
              )}
              <button
                className={`${styles.button} ${
                  (!notes || notes === null) && styles.disabled
                }`}
                onClick={() => handleApprove(id, !isInteview)}
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
