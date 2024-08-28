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
const PaymentRequest = () => {
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
        `${BaseUrl}payments_approval.php`

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
              <span> {items?.description}</span>
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
              Payment Mode: <span>{items?.payment_mode}</span>
            </div>
            {/* <div className={styles.title}>
              Date: <span>{items?.start_date}</span>
            </div> */}
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Amount: <span>{items?.amount}</span>
            </div>
            <div className={styles.title}>
              Added Date: <span>{items?.added_date}</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Vendor Name: <span>{items?.vendor_name}</span>
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
      .post(`${BaseUrl}update_payment_status.php`, {
        id: isMulti ? selectData : [e],
        admin_status: "approve",
        note: notes || "Approved",
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
              `${BaseUrl}payments_approval.php`
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
        <Title varriant="h1" title="Payment Requests" />
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
        title={`Name: ${trData?.payment_mode}`}
        handleApprove={handleApprove}
        notes={notes}
        setnotes={setnotes}
      >
        <div className={styles.contentarea}>
          <div>
            <label className="capitalize">description</label>
            <p>{trData?.description}</p>
          </div>
          <div>
            <label className="capitalize">acc bank name</label>
            <p>{trData?.acc_bank_name}</p>
          </div>
          <div>
            <label className="capitalize">acc hol name</label>
            <p>{trData?.acc_hol_name}</p>
          </div>
          <div>
            <label className="capitalize">acc number</label>
            <p>{trData?.acc_number}</p>
          </div>
          <div>
            <label className="capitalize">added by</label>
            <p>{trData?.added_by}</p>
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
            <label className="capitalize">amount</label>
            <p>{trData?.amount}</p>
          </div>
          <div>
            <label className="capitalize">amount spent</label>
            <p>{trData?.amount_spent}</p>
          </div>
          <div>
            <label className="capitalize">amounttype</label>
            <p>{trData?.amounttype}</p>
          </div>
          <div>
            <label className="capitalize">approved cam</label>
            <p>{trData?.approved_cam}</p>
          </div>
          <div>
            <label className="capitalize">cancel cheque</label>
            <p>{trData?.cancel_cheque}</p>
          </div>
          <div>
            <label className="capitalize">cancellation date</label>
            <p>{trData?.cancellation_date}</p>
          </div>

          <div>
            <label className="capitalize">dmm name</label>
            <p>{trData?.dmm_name}</p>
          </div>
          <div>
            <label className="capitalize">end date</label>
            <p>{trData?.end_date}</p>
          </div>
          <div>
            <label className="capitalize">entity</label>
            <p>{trData?.entity}</p>
          </div>
          <div>
            <label className="capitalize">files</label>
            <p onClick={() => downloadPdfBlob(trData?.files)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label className="capitalize">finance status</label>
            <p>{trData?.finance_status}</p>
          </div>
          <div>
            <label className="capitalize">id</label>
            <p>{trData?.id}</p>
          </div>
          <div>
            <label className="capitalize">ifsc code</label>
            <p>{trData?.ifsc_code}</p>
          </div>
          <div>
            <label className="capitalize">invoice date</label>
            <p>{trData?.invoice_date}</p>
          </div>
          <div>
            <label className="capitalize">invoice number</label>
            <p>{trData?.invoice_number}</p>
          </div>
          <div>
            <label className="capitalize">lead approval</label>
            <p>{trData?.lead_approval}</p>
          </div>
          <div>
            <label className="capitalize">link</label>
            <p
              onClick={() => window.open(trData?.link, "_blank")}
              className="text-blue-400"
              style={{ color: "rgb(59 130 246)" }}
            >
              link
            </p>
          </div>
          <div>
            <label className="capitalize">no of leads</label>
            <p>{trData?.no_of_leads}</p>
          </div>
          <div>
            <label className="capitalize">nofdays</label>
            <p>{trData?.nofdays}</p>
          </div>
          <div>
            <label className="capitalize">note</label>
            <p>{trData?.note}</p>
          </div>
          <div>
            <label className="capitalize">password</label>
            <p>{trData?.password}</p>
          </div>
          <div>
            <label className="capitalize">payment for</label>
            <p>{trData?.payment_for}</p>
          </div>
          <div>
            <label className="capitalize">payment mode</label>
            <p>{trData?.payment_mode}</p>
          </div>
          <div>
            <label className="capitalize">payment status</label>
            <p>{trData?.payment_status}</p>
          </div>
          <div>
            <label className="capitalize">portal</label>
            <p>{trData?.portal}</p>
          </div>
          <div>
            <label className="capitalize">purpose</label>
            <p>{trData?.purpose}</p>
          </div>
          <div>
            <label className="capitalize">rcm</label>
            <p>{trData?.rcm}</p>
          </div>
          <div>
            <label className="capitalize">reason</label>
            <p>{trData?.reason}</p>
          </div>
          <div>
            <label className="capitalize">refund amount</label>
            <p>{trData?.refund_amount}</p>
          </div>
          <div>
            <label className="capitalize">start date</label>
            <p>{trData?.start_date}</p>
          </div>
          <div>
            <label className="capitalize">ticket status</label>
            <p>{trData?.ticket_status}</p>
          </div>
          <div>
            <label className="capitalize">travel date</label>
            <p>{trData?.travel_date}</p>
          </div>
          <div>
            <label className="capitalize">trvl from</label>
            <p>{trData?.trvl_from}</p>
          </div>
          <div>
            <label className="capitalize">trvl to</label>
            <p>{trData?.trvl_to}</p>
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
            <label className="capitalize">used card</label>
            <p>{trData?.used_card}</p>
          </div>
          <div>
            <label className="capitalize">used card number</label>
            <p>{trData?.used_card_number}</p>
          </div>
          <div>
            <label className="capitalize">used date</label>
            <p>{trData?.used_date}</p>
          </div>
          <div>
            <label className="capitalize">user id</label>
            <p>{trData?.user_id}</p>
          </div>
          <div>
            <label className="capitalize">vendor email</label>
            <p>{trData?.vendor_email}</p>
          </div>
          <div>
            <label className="capitalize">vendor name</label>
            <p>{trData?.vendor_name}</p>
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

export default PaymentRequest;
