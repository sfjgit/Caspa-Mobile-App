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

const ClientMeeting = () => {
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
        `${BaseUrl}client_meeting_tracker.php`

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
              Client Name:
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
              Client Contact: <span>{items?.c_s_contact}</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Mode : <span>{items?.mode}</span>
            </div>
            <div className={styles.title}>
              Revenue Gen : <span>{items?.revenue_gen}</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Location: <span>{items?.location}</span>
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
              `${BaseUrl}client_meeting_tracker.php`
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
  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className="flex justify-between">
        <Title varriant="h1" title="Client Meetings" />
        {/* <button
          className={`${styles.button} ${
            selectData && selectData?.length <= 0 && styles.disabled
          }`}
          onClick={() => handleApprove(selectData, true)}
          disabled={selectData && selectData?.length <= 0}
        >
          Approve
        </button> */}
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
        isApprove={false}
        setnotes={setnotes}
      >
        <div className={styles.contentarea}>
          <div>
            <label className="capitalize">a names</label>
            <p>{trData?.a_names}</p>
          </div>
          <div>
            <label className="capitalize">a names1</label>
            <p>{trData?.a_names1}</p>
          </div>

          <div>
            <label className="capitalize">addeddate</label>
            <p>{trData?.addeddate}</p>
          </div>
          <div>
            <label className="capitalize">assign to</label>
            <p>{trData?.assign_to}</p>
          </div>
          <div>
            <label className="capitalize">assign to1</label>
            <p>{trData?.assign_to1}</p>
          </div>
          <div>
            <label className="capitalize">c s contact</label>
            <p>{trData?.c_s_contact}</p>
          </div>
          <div>
            <label className="capitalize">c s designation</label>
            <p>{trData?.c_s_designation}</p>
          </div>
          <div>
            <label className="capitalize">c s mail</label>
            <p>{trData?.c_s_mail}</p>
          </div>
          <div>
            <label className="capitalize">c s name</label>
            <p>{trData?.c_s_name}</p>
          </div>
          <div>
            <label className="capitalize">c size</label>
            <p>{trData?.c_size}</p>
          </div>
          <div>
            <label className="capitalize">client name</label>
            <p>{trData?.client_name}</p>
          </div>
          <div>
            <label className="capitalize">client status</label>
            <p>{trData?.client_status}</p>
          </div>
          <div>
            <label className="capitalize">feedback1</label>
            <p>{trData?.feedback1}</p>
          </div>
          <div>
            <label className="capitalize">feedback2</label>
            <p>{trData?.feedback2}</p>
          </div>
          <div>
            <label className="capitalize">feedback3</label>
            <p>{trData?.feedback3}</p>
          </div>
          <div>
            <label className="capitalize">feedback4</label>
            <p>{trData?.feedback4}</p>
          </div>
          <div>
            <label className="capitalize">feedback5</label>
            <p>{trData?.feedback5}</p>
          </div>
          <div>
            <label className="capitalize">feedback6</label>
            <p>{trData?.feedback6}</p>
          </div>
          <div>
            <label className="capitalize">feedback7</label>
            <p>{trData?.feedback7}</p>
          </div>
          <div>
            <label className="capitalize">feedback8</label>
            <p>{trData?.feedback8}</p>
          </div>
          <div>
            <label className="capitalize">feedback9</label>
            <p>{trData?.feedback9}</p>
          </div>
          <div>
            <label className="capitalize">feedback10</label>
            <p>{trData?.feedback10}</p>
          </div>
          <div>
            <label className="capitalize">id</label>
            <p>{trData?.id}</p>
          </div>
          <div>
            <label className="capitalize">industry</label>
            <p>{trData?.industry}</p>
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
            <label className="capitalize">inv time</label>
            <p>{trData?.inv_time}</p>
          </div>
          <div>
            <label className="capitalize">inv time1</label>
            <p>{trData?.inv_time1}</p>
          </div>
          <div>
            <label className="capitalize">link</label>
            <p>{trData?.link}</p>
          </div>
          <div>
            <label className="capitalize">location</label>
            <p>{trData?.location}</p>
          </div>
          <div>
            <label className="capitalize">meeting status</label>
            <p>{trData?.meeting_status}</p>
          </div>
          <div>
            <label className="capitalize">mode</label>
            <p>{trData?.mode}</p>
          </div>
          <div>
            <label className="capitalize">n attendies</label>
            <p>{trData?.n_attendies}</p>
          </div>
          <div>
            <label className="capitalize">req type</label>
            <p>{trData?.req_type}</p>
          </div>
          <div>
            <label className="capitalize">revenue gen</label>
            <p>{trData?.revenue_gen}</p>
          </div>
          <div>
            <label className="capitalize">updateddate</label>
            <p>{trData?.updateddate}</p>
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

export default ClientMeeting;
