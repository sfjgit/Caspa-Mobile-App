/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable */

import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../config";
import Title from "../../CommonComponents/Title/title";
import Card from "../../CommonComponents/Card/card";
import { toast, ToastContainer } from "react-toastify";
import Modal from "../../components/Modal/modal";
import Badge from "../../CommonComponents/Badge/Badge";
import DownloadIcon from "../../assets/download-icon.png";
import ApproveModal from "../../components/ApproveModal/modal";

import ViewMore from "../../assets/viewmore.png";

import styles from "./index.module.scss";

const trData = {
  training_no: "001",
  start_date: "2024-08-01",
  end_date: "2024-08-05",
  status: "Completed",
  type: "Technical",
  cost: "1,23,123",
  trainer_name: "John Doe",
  training_name: "Advanced Python Programming",
  client_name: "TechCorp Inc.",
};
const InterviewTracker = () => {
  const [open, setopen] = useState({
    isVisible: false,
    isApprove: false,
    trData: {},
  });
  const [selectData, setselectedData] = useState([]);
  const [data, setdata] = useState([]);
  const [notes, setnotes] = useState({
    notes: "",
    notes1: "",
    notes2: "",
    notes3: "",
    notes4: "",
  });

  useEffect(() => {
    axios
      .get(
        `${BaseUrl}applicant_approval.php`

        // { withCredentials: false, headers }
      )
      .then(function (response) {
        console.log(response);
        setdata(response?.data);
        // if (response?.status === 200) {
        //   cookie.set("token", response?.data?.token, { path: "/" });
        //   navigate("/dashboard");
        // }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChange = (e, key) => {
    if (e) {
      setselectedData([...selectData, key]);
    } else {
      const selData = selectData;
      const newselData = selData?.filter((i) => i !== key);

      setselectedData(newselData);
    }
  };

  const GetCard = ({ items }) => {
    console.log(items);
    return (
      <div className="mb-5">
        <Card>
          <div className={styles.row}>
            <div className={`${styles.title} 'flex items-center h-auto'`}>
              {/* <input
                type="checkbox"
                checked={selectData?.includes(items?.id) || false}
                onChange={(e) => handleChange(e?.target?.checked, items?.id)}
              />{" "} */}
              Name:
              <span> {items?.name_adhar}</span>
              <div></div>
            </div>
            {/* <div>
              <Badge
                title={items?.status}
                varriant={items?.status?.toLowerCase()}
              />
            </div> */}
          </div>
          {/* <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Status: <span>{items?.admin_status}</span>
            </div>
            {/* <div className={styles.title}>
              Email: <span>{items?.email}</span>
            </div> 
          </div> */}
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              HR Status: <span>{items?.hr_status}</span>
            </div>
            <div className={styles.title}>
              Email: <span>{items?.c_email}</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Designation : <span>{items?.designation}</span>
            </div>
            {/* <div className={styles.title}>
              Email: <span>{items?.c_email}</span>
            </div> */}
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Added Date : <span>{items?.added_date}</span>
            </div>
          </div>

          <div className={`${styles.row} ${styles.rowgap}`}>
            <button
              className={`${styles.button} ${
                selectData && selectData?.length <= 0 && styles.disabled
              }`}
              onClick={() =>
                setopen({
                  ...open,
                  isApprove: true,
                  trData: items,
                })
              }
              disabled={selectData && selectData?.length <= 0}
            >
              Approve
            </button>
            <div
              className={styles.expandIcon}
              onClick={() =>
                setopen({
                  isVisible: true,
                  isApprove: false,
                  trData: items,
                })
              }
            >
              View More <img src={ViewMore} width={24} />
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const handleApprove = (e, isMulti = false) => {
    console.log(e, isMulti);
    const toastId = toast.info("Loading...", {
      position: "top-right",
    });

    console.log(open?.trData, open);
    const payload =
      trData?.assign_to !== "siva sarathy"
        ? {
            id: isMulti ? selectData : e,
            assign_to: trData?.assign_to,
            manager_status: "Selected",
            manager_note: notes?.notes || "",
            note2: notes?.notes1 || "",
            note3: notes?.notes2 || "",
            note4: notes?.notes3 || "",
            note5: notes?.notes4 || "",
          }
        : trData?.assign_to_admin == "siva sarathy"
        ? {
            id: isMulti ? selectData : e,
            assign_to_admin: trData?.assign_to_admin,
            manager_status1: "Selected",
            manager_note1: notes?.notes || "",
            note2_3: notes?.notes1 || "",
            note3_3: notes?.notes2 || "",
            note4_3: notes?.notes3 || "",
            note5_3: notes?.notes4 || "",
          }
        : trData?.assign_to_admin1 == "siva sarathy"
        ? {
            id: isMulti ? selectData : e,
            assign_to_admin1: trData?.assign_to_admin,
            admin_status: "Selected",
            admin_note: notes?.notes || "",
            note2_4: notes?.notes1 || "",
            note3_4: notes?.notes2 || "",
            note4_4: notes?.notes3 || "",
            note5_4: notes?.notes4 || "",
          }
        : {};

    axios
      .post(`${BaseUrl}update_inv_trackers.php`, {
        ...payload,
      })
      .then(function (response) {
        console.log(response);
        if (response?.data?.status) {
          console.log(response);
          setselectedData([]);

          toast.update(toastId, {
            render: "Successfully Approved",
            type: toast?.TYPE?.SUCCESS,
            closeButton: true,
            autoClose: 2000,
            progressStyle: { background: "#097969" },
            style: { color: "#097969" },
          });
          axios
            .get(
              `${BaseUrl}inv_tracker_Approval.php`
              // { withCredentials: false, headers }
            )
            .then(function (response) {
              console.log(response);
              setdata(response?.data);
              // if (response?.status === 200) {
              //   cookie.set("token", response?.data?.token, { path: "/" });
              //   navigate("/dashboard");
              // }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          toast.update(toastId, {
            render: response?.data?.message,
            type: toast?.TYPE?.ERROR,
            closeButton: true,
            autoClose: 2000,
            progressStyle: { background: "#B00020" },
            style: { color: "#B00020" },
          });
        }

        // setdata(response?.data);
        // if (response?.status === 200) {
        //   cookie.set("token", response?.data?.token, { path: "/" });
        //   navigate("/dashboard");
        // }
      })
      .catch(function (error) {
        console.log(error);
        toast.update(toastId, {
          render: "Please try later",
          type: toast?.TYPE?.ERROR,
          closeButton: true,
          autoClose: 2000,
          progressStyle: { background: "#B00020" },
          style: { color: "#B00020" },
        });
      });

    // toast("Wow so easy!");
  };

  const downloadPdfBlob = async (e) => {
    // console.log(e, name);
    axios
      .get(`https://cirrus1.co/caspa/proxy.php?file=${e}`, {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", e); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.log(error));

    // const response = await fetch(`${BaseUrl}upload/${e}`);
    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", `${name}.pdf`);
    // document.body.appendChild(link);
    // link.click();
    // link.parentNode.removeChild(link);

    // console.log(link);
  };

  const trData = open?.trData;

  console.log(trData);
  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className="flex justify-between">
        <Title varriant="h1" title="Interview Tracker" />
      </div>
      <ApproveModal
        open={open?.isApprove}
        handleClose={() =>
          setopen({
            isVisible: false,
            isApprove: false,
            trData: {},
          })
        }
        id={trData?.id}
        title=""
        handleApprove={handleApprove}
        notes={notes}
        setnotes={(e, key) =>
          setnotes({
            ...notes,
            [key]: e,
          })
        }
        isInteview={true}
      />

      <Modal
        open={open?.isVisible}
        handleClose={() =>
          setopen({
            isVisible: false,
            isApprove: false,
            trData: {},
          })
        }
        id={trData?.id}
        title={`Name: ${trData?.name_adhar}`}
        handleApprove={handleApprove}
        notes={notes}
        setnotes={setnotes}
        isApprove={false}
      >
        <div className={styles.contentarea}>
          <div>
            <label className="capitalize">cv</label>
            <p onClick={() => downloadPdfBlob(trData?.cv)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label className="capitalize">designation</label>
            <p>{trData?.designation}</p>
          </div>
          <div>
            <label className="capitalize">experience</label>
            <p>{trData?.experience}</p>
          </div>
          <div>
            <label className="capitalize">file</label>
            <p onClick={() => downloadPdfBlob(trData?.file)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label className="capitalize">hr name</label>
            <p>{trData?.hr_name}</p>
          </div>
          <div>
            <label className="capitalize">hr note</label>
            <p>{trData?.hr_note}</p>
          </div>
          <div>
            <label className="capitalize">hr status</label>
            <p>{trData?.hr_status}</p>
          </div>
          <div>
            <label className="capitalize">id</label>
            <p>{trData?.id}</p>
          </div>
          <div>
            <label className="capitalize">inv date</label>
            <p>{trData?.inv_date}</p>
          </div>
          <div>
            <label className="capitalize">inv date1</label>
            <p>{trData?.inv_date1}</p>
          </div>
          <div>
            <label className="capitalize">inv date2</label>
            <p>{trData?.inv_date2}</p>
          </div>
          <div>
            <label className="capitalize">inv mode</label>
            <p>{trData?.inv_mode}</p>
          </div>
          <div>
            <label className="capitalize">inv time</label>
            <p>{trData?.inv_time}</p>
          </div>
          <div>
            <label className="capitalize">inv time1</label>
            <p>{trData?.inv_time1}</p>
          </div>
          <div>
            <label className="capitalize">inv time2</label>
            <p>{trData?.inv_time2}</p>
          </div>
          <div>
            <label className="capitalize">manager note</label>
            <p>{trData?.manager_note}</p>
          </div>
          <div>
            <label className="capitalize">manager note1</label>
            <p>{trData?.manager_note1}</p>
          </div>
          <div>
            <label className="capitalize">manager status</label>
            <p>{trData?.manager_status}</p>
          </div>
          <div>
            <label className="capitalize">manager status1</label>
            <p>{trData?.manager_status1}</p>
          </div>
          <div>
            <label className="capitalize">added date</label>
            <p>{trData?.added_date}</p>
          </div>
          <div>
            <label className="capitalize">admin note</label>
            <p>{trData?.admin_note}</p>
          </div>
          <div>
            <label className="capitalize">admin status</label>
            <p>{trData?.admin_status}</p>
          </div>
          <div>
            <label className="capitalize">assign to</label>
            <p>{trData?.assign_to}</p>
          </div>
          <div>
            <label className="capitalize">assign to admin</label>
            <p>{trData?.assign_to_admin}</p>
          </div>
          <div>
            <label className="capitalize">assign to admin1</label>
            <p>{trData?.assign_to_admin1}</p>
          </div>
          <div>
            <label className="capitalize">c email</label>
            <p>{trData?.c_email}</p>
          </div>
          <div>
            <label className="capitalize">c location</label>
            <p>{trData?.c_location}</p>
          </div>
          <div>
            <label className="capitalize">c mbl</label>
            <p>{trData?.c_mbl}</p>
          </div>
          <div>
            <label className="capitalize">cli ac1</label>
            <p>{trData?.cli_ac1}</p>
          </div>
          <div>
            <label className="capitalize">cli ac2</label>
            <p>{trData?.cli_ac2}</p>
          </div>
          <div>
            <label className="capitalize">cli ac3</label>
            <p>{trData?.cli_ac3}</p>
          </div>
          <div>
            <label className="capitalize">cli ac4</label>
            <p>{trData?.cli_ac4}</p>
          </div>
          <div>
            <label className="capitalize">cli ac5</label>
            <p>{trData?.cli_ac5}</p>
          </div>
          <div>
            <label className="capitalize">cli ac6</label>
            <p>{trData?.cli_ac6}</p>
          </div>
          <div>
            <label className="capitalize">cli ac7</label>
            <p>{trData?.cli_ac7}</p>
          </div>
          <div>
            <label className="capitalize">cli ac8</label>
            <p>{trData?.cli_ac8}</p>
          </div>
          <div>
            <label className="capitalize">cli ac9</label>
            <p>{trData?.cli_ac9}</p>
          </div>
          <div>
            <label className="capitalize">cli ac10</label>
            <p>{trData?.cli_ac10}</p>
          </div>
          <div>
            <label className="capitalize">cnote1</label>
            <p>{trData?.cnote1}</p>
          </div>
          <div>
            <label className="capitalize">cnote2</label>
            <p>{trData?.cnote2}</p>
          </div>
          <div>
            <label className="capitalize">cnote3</label>
            <p>{trData?.cnote3}</p>
          </div>
          <div>
            <label className="capitalize">cnote4</label>
            <p>{trData?.cnote4}</p>
          </div>
          <div>
            <label className="capitalize">cnote5</label>
            <p>{trData?.cnote5}</p>
          </div>
          <div>
            <label className="capitalize">cnote6</label>
            <p>{trData?.cnote6}</p>
          </div>
          <div>
            <label className="capitalize">cnote7</label>
            <p>{trData?.cnote7}</p>
          </div>
          <div>
            <label className="capitalize">cnote8</label>
            <p>{trData?.cnote8}</p>
          </div>
          <div>
            <label className="capitalize">cnote9</label>
            <p>{trData?.cnote9}</p>
          </div>
          <div>
            <label className="capitalize">cnote10</label>
            <p>{trData?.cnote10}</p>
          </div>

          <div>
            <label className="capitalize">note2</label>
            <p>{trData?.note2}</p>
          </div>
          <div>
            <label className="capitalize">note2 3</label>
            <p>{trData?.note2_3}</p>
          </div>
          <div>
            <label className="capitalize">note2 4</label>
            <p>{trData?.note2_4}</p>
          </div>
          <div>
            <label className="capitalize">note3</label>
            <p>{trData?.note3}</p>
          </div>
          <div>
            <label className="capitalize">note3 3</label>
            <p>{trData?.note3_3}</p>
          </div>
          <div>
            <label className="capitalize">note3 4</label>
            <p>{trData?.note3_4}</p>
          </div>
          <div>
            <label className="capitalize">note4</label>
            <p>{trData?.note4}</p>
          </div>
          <div>
            <label className="capitalize">note4 3</label>
            <p>{trData?.note4_3}</p>
          </div>
          <div>
            <label className="capitalize">note4 4</label>
            <p>{trData?.note4_4}</p>
          </div>
          <div>
            <label className="capitalize">note5</label>
            <p>{trData?.note5}</p>
          </div>
          <div>
            <label className="capitalize">note5 3</label>
            <p>{trData?.note5_3}</p>
          </div>
          <div>
            <label className="capitalize">note5 4</label>
            <p>{trData?.note5_4}</p>
          </div>
          <div>
            <label className="capitalize">notice period</label>
            <p>{trData?.notice_period}</p>
          </div>
          <div>
            <label className="capitalize">rel experience</label>
            <p>{trData?.rel_experience}</p>
          </div>
          <div>
            <label className="capitalize">revenue1</label>
            <p>{trData?.revenue1}</p>
          </div>
          <div>
            <label className="capitalize">revenue2</label>
            <p>{trData?.revenue2}</p>
          </div>
          <div>
            <label className="capitalize">revenue3</label>
            <p>{trData?.revenue3}</p>
          </div>
          <div>
            <label className="capitalize">revenue4</label>
            <p>{trData?.revenue4}</p>
          </div>
          <div>
            <label className="capitalize">revenue5</label>
            <p>{trData?.revenue5}</p>
          </div>
          <div>
            <label className="capitalize">revenue6</label>
            <p>{trData?.revenue6}</p>
          </div>
          <div>
            <label className="capitalize">revenue7</label>
            <p>{trData?.revenue7}</p>
          </div>
          <div>
            <label className="capitalize">revenue8</label>
            <p>{trData?.revenue8}</p>
          </div>
          <div>
            <label className="capitalize">revenue9</label>
            <p>{trData?.revenue9}</p>
          </div>
          <div>
            <label className="capitalize">revenue10</label>
            <p>{trData?.revenue10}</p>
          </div>
          <div>
            <label className="capitalize">status</label>
            <p>{trData?.status}</p>
          </div>
          <div>
            <label className="capitalize">tr req id</label>
            <p>{trData?.tr_req_id}</p>
          </div>
          <div>
            <label className="capitalize">updated date</label>
            <p>{trData?.updated_date}</p>
          </div>
        </div>
      </Modal>
      <div className={styles.area}>
        {data && data?.length > 0 ? (
          data?.map((items) => <GetCard items={items} />)
        ) : (
          <p>Record Not Found!!</p>
        )}
      </div>
    </div>
  );
};

export default InterviewTracker;
