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
const Nda = () => {
  const [open, setopen] = useState({
    isVisible: false,
    trData: {},
  });
  const [selectData, setselectedData] = useState([]);
  const [data, setdata] = useState([]);
  const [notes, setnotes] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${BaseUrl}nda_approval.php`

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
              <input
                type="checkbox"
                checked={selectData?.includes(items?.id) || false}
                onChange={(e) => handleChange(e?.target?.checked, items?.id)}
              />{" "}
              Description:
              <span> {items?.client_name}</span>
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
              Client Rate: <span>{items?.client_rate}</span>
            </div>
            {/* <div className={styles.title}>
              Date: <span>{items?.start_date}</span>
            </div> */}
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Nda No : <span>{items?.nda_no}</span>
            </div>
            <div className={styles.title}>
              End Date: <span>{items?.end_date}</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Amount: <span>{items?.gst}</span>
            </div>
            <div
              className={styles.expandIcon}
              onClick={() =>
                setopen({
                  isVisible: true,
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
    axios
      .post(`${BaseUrl}update_nda_status.php`, {
        id: isMulti ? selectData : [e],
        admin_status: "approve",
        remarks: notes || "Approved",
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
              `${BaseUrl}nda_approval.php`
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
      .get(`http://cirrus1.co/caspa/upload/${e}`, {
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
  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className="flex justify-between">
        <Title varriant="h1" title="Nda" />
        <button
          className={`${styles.button} ${
            selectData && selectData?.length <= 0 && styles.disabled
          }`}
          onClick={() => handleApprove(selectData, true)}
          disabled={selectData && selectData?.length <= 0}
        >
          Approve
        </button>
      </div>

      <Modal
        open={open?.isVisible}
        handleClose={() =>
          setopen({
            isVisible: false,
            trData: {},
          })
        }
        id={trData?.id}
        title={`Name: ${trData?.client_name}`}
        handleApprove={handleApprove}
        notes={notes}
        setnotes={setnotes}
      >
        <div className={styles.contentarea}>
          <div>
            <label className="capitalize">added by</label>
            <p>{trData?.added_by}</p>
          </div>
          <div>
            <label className="capitalize">added date</label>
            <p>{trData?.added_date}</p>
          </div>
          <div>
            <label className="capitalize">booking date</label>
            <p>{trData?.booking_date}</p>
          </div>
          <div>
            <label className="capitalize">caspa id</label>
            <p>{trData?.caspa_id}</p>
          </div>
          <div>
            <label className="capitalize">client name</label>
            <p>{trData?.client_name}</p>
          </div>
          <div>
            <label className="capitalize">client rate</label>
            <p>{trData?.client_rate}</p>
          </div>
          <div>
            <label className="capitalize">contact client</label>
            <p>{trData?.contact_client}</p>
          </div>
          <div>
            <label className="capitalize">contact sfj</label>
            <p>{trData?.contact_sfj}</p>
          </div>
          <div>
            <label className="capitalize">course code</label>
            <p>{trData?.course_code}</p>
          </div>
          <div>
            <label className="capitalize">d lead</label>
            <p>{trData?.d_lead}</p>
          </div>
          <div>
            <label className="capitalize">daytype</label>
            <p>{trData?.daytype}</p>
          </div>
          <div>
            <label className="capitalize">end date</label>
            <p>{trData?.end_date}</p>
          </div>
          <div>
            <label className="capitalize">file</label>
            <p>{trData?.file}</p>
            <p onClick={() => downloadPdfBlob(trData?.file)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label className="capitalize">file1</label>
            <p onClick={() => downloadPdfBlob(trData?.file1)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label className="capitalize">gst</label>
            <p>{trData?.gst}</p>
          </div>
          <div>
            <label className="capitalize">id</label>
            <p>{trData?.id}</p>
          </div>
          <div>
            <label className="capitalize">id1</label>
            <p>{trData?.id1}</p>
          </div>
          <div>
            <label className="capitalize">location w w</label>
            <p>{trData?.location_w_w}</p>
          </div>
          <div>
            <label className="capitalize">nda no</label>
            <p>{trData?.nda_no}</p>
          </div>
          <div>
            <label className="capitalize">nda status</label>
            <p>{trData?.nda_status}</p>
          </div>
          <div>
            <label className="capitalize">payment term</label>
            <p>{trData?.payment_term}</p>
          </div>
          <div>
            <label className="capitalize">per d cost</label>
            <p>{trData?.per_d_cost}</p>
          </div>
          <div>
            <label className="capitalize">per h cost</label>
            <p>{trData?.per_h_cost}</p>
          </div>
          <div>
            <label className="capitalize">per m cost</label>
            <p>{trData?.per_m_cost}</p>
          </div>
          <div>
            <label className="capitalize">profit p</label>
            <p>{trData?.profit_p}</p>
          </div>
          <div>
            <label className="capitalize">recruiter</label>
            <p>{trData?.recruiter}</p>
          </div>
          <div>
            <label className="capitalize">remarks</label>
            <p>{trData?.remarks}</p>
          </div>
          <div>
            <label className="capitalize">return date</label>
            <p>{trData?.return_date}</p>
          </div>
          <div>
            <label className="capitalize">return location w w</label>
            <p>{trData?.return_location_w_w}</p>
          </div>
          <div>
            <label className="capitalize">sales p</label>
            <p>{trData?.sales_p}</p>
          </div>
          <div>
            <label className="capitalize">start date</label>
            <p>{trData?.start_date}</p>
          </div>
          <div>
            <label className="capitalize">status</label>
            <p>{trData?.status}</p>
          </div>
          <div>
            <label className="capitalize">tds amount</label>
            <p>{trData?.tds_amount}</p>
          </div>
          <div>
            <label className="capitalize">trainer address</label>
            <p>{trData?.trainer_address}</p>
          </div>
          <div>
            <label className="capitalize">trainer contact</label>
            <p>{trData?.trainer_contact}</p>
          </div>
          <div>
            <label className="capitalize">trainer cost</label>
            <p>{trData?.trainer_cost}</p>
          </div>
          <div>
            <label className="capitalize">trainer duration</label>
            <p>{trData?.trainer_duration}</p>
          </div>
          <div>
            <label className="capitalize">trainer duration d</label>
            <p>{trData?.trainer_duration_d}</p>
          </div>
          <div>
            <label className="capitalize">trainer duration m</label>
            <p>{trData?.trainer_duration_m}</p>
          </div>
          <div>
            <label className="capitalize">trainer email</label>
            <p>{trData?.trainer_email}</p>
          </div>
          <div>
            <label className="capitalize">trainer name</label>
            <p>{trData?.trainer_name}</p>
          </div>
          <div>
            <label className="capitalize">training duration</label>
            <p>{trData?.training_duration}</p>
          </div>
          <div>
            <label className="capitalize">training location</label>
            <p>{trData?.training_location}</p>
          </div>
          <div>
            <label className="capitalize">type</label>
            <p>{trData?.type}</p>
          </div>
          <div>
            <label className="capitalize">type1</label>
            <p>{trData?.type1}</p>
          </div>
          <div>
            <label className="capitalize">type2</label>
            <p>{trData?.type2}</p>
          </div>
          <div>
            <label className="capitalize">type3</label>
            <p>{trData?.type3}</p>
          </div>
          <div>
            <label className="capitalize">type4</label>
            <p>{trData?.type4}</p>
          </div>
          <div>
            <label className="capitalize">type5</label>
            <p>{trData?.type5}</p>
          </div>
          <div>
            <label className="capitalize">type7</label>
            <p>{trData?.type7}</p>
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

export default Nda;
