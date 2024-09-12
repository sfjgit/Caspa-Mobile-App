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
              {isInteview && (
                <>
                  <div>
                    <label>Status</label>
                  </div>
                  <select
                    id="status"
                    value={notes?.status}
                    onChange={(e) => setnotes(e?.target?.value, "status")}
                    style={{ width: "94%" }}
                    className="block mb-3 px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      -- Select Status --
                    </option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                    <option value="hold">Hold</option>
                  </select>
                </>
              )}
              <div>
                <label>Note</label>
              </div>

              <textarea onChange={(e) => setnotes(e?.target?.value, "notes")} />
              {isInteview && (
                <>
                  <div>
                    <label>Note 2</label>
                  </div>
                  <textarea
                    onChange={(e) => setnotes(e?.target?.value, "notes1")}
                  />
                  <div>
                    <label>Note 3</label>
                  </div>
                  <textarea
                    onChange={(e) => setnotes(e?.target?.value, "notes2")}
                  />
                  <div>
                    <label>Note 4</label>
                  </div>
                  <textarea
                    onChange={(e) => setnotes(e?.target?.value, "notes3")}
                  />
                  <div>
                    <label>Note 5</label>
                  </div>
                  <textarea
                    onChange={(e) => setnotes(e?.target?.value, "notes4")}
                  />
                </>
              )}
              <div className="grid gap-5 w-full grid-flow-col auto-cols-max">
                <button
                  className={`${styles.button}`}
                  onClick={() => handleApprove(id, "Approve", !isInteview)}
                  // disabled={!notes || notes === null}
                >
                  {isInteview ? "Submit" : "Approve"}
                </button>
                {!isInteview && (
                  <button
                    className={`${styles.button} ${styles.rejectbutton}`}
                    onClick={() => handleApprove(id, "Reject", !isInteview)}
                    // disabled={!notes || notes === null}
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
