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
import ApproveModal from "../../components/ApproveModal/modal";
import Badge from "../../CommonComponents/Badge/Badge";
import DownloadIcon from "../../assets/download-icon.png";

import ViewMore from "../../assets/viewmore.png";

import styles from "./index.module.scss";

const sampleData = [
  {
    training_no: "001",
    start_date: "2024-08-01",
    end_date: "2024-08-05",
    status: "Completed",
    type: "Technical",
    cost: "1,23,12",
    trainer_name: "John Doe",
    training_name: "Advanced Python Programming",
    client_name: "TechCorp Inc.",
  },
  {
    training_no: "002",
    start_date: "2024-08-10",
    end_date: "2024-08-15",
    status: "Ongoing",
    type: "Management",
    cost: 2000,
    trainer_name: "Jane Smith",
    training_name: "Leadership Essentials",
    client_name: "BizSolutions Ltd.",
  },
  {
    training_no: "003",
    start_date: "2024-09-01",
    end_date: "2024-09-05",
    status: "Scheduled",
    type: "Soft Skills",
    cost: 1000,
    trainer_name: "Alice Johnson",
    training_name: "Effective Communication",
    client_name: "Global Enterprises",
  },
  {
    training_no: "004",
    start_date: "2024-07-15",
    end_date: "2024-07-20",
    status: "Completed",
    type: "Technical",
    cost: 1800,
    trainer_name: "Bob Brown",
    training_name: "Network Security Fundamentals",
    client_name: "SecureNet Inc.",
  },
  {
    training_no: "005",
    start_date: "2024-08-20",
    end_date: "2024-08-25",
    status: "Scheduled",
    type: "Compliance",
    cost: 1200,
    trainer_name: "Eve Davis",
    training_name: "Data Protection Regulations",
    client_name: "HealthPlus Corp.",
  },
];

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
const ApplicantAwaiting = () => {
  const [open, setopen] = useState({
    isVisible: false,
    isApprove: false,
    trData: {},
  });
  const [selectData, setselectedData] = useState([]);
  const [data, setdata] = useState([]);
  const [notes, setnotes] = useState(null);

  useEffect(() => {
    axios
      .get(`${BaseUrl}applicant_approval.php`)
      .then(function (response) {
        setdata(response?.data);
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
              Name:
              <span> {items?.name_adhar}</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Status: <span>{items?.status}</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Email: <span>{items?.email}</span>
            </div>
            <div className={styles.title}>
              Date: <span>{items?.date}</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Current CTC: <span>{items?.current_ctc}</span>
            </div>
            <div className={styles.title}>
              Expected CTC: <span>{items?.expected_ctc}</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Mobile: <span>{items?.mobile}</span>
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
    const toastId = toast.info("Loading...", {
      position: "top-right",
    });
    axios
      .post(`${BaseUrl}update_applicant_status.php`, {
        id: isMulti ? selectData : [e],
        status: "approve",
        note: notes || "Approved",
      })
      .then(function (response) {
        if (response?.data?.status) {
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
              `${BaseUrl}applicant_approval.php`
              // { withCredentials: false, headers }
            )
            .then(function (response) {
              setopen({
                ...open,
                isVisible: false,
                isApprove: false,
              });
              setdata(response?.data);
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
      })
      .catch(function (error) {
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
    axios
      .get(`https://cirrus1.co/caspa/proxy.php?file=${e}`, {
        responseType: "blob",
        crossdomain: true,
        withCredentials: false,
        headers: {
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
  };

  const trData = open?.trData;
  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className="flex justify-between">
        <Title varriant="h1" title="Applicant Waiting" />
        <button
          className={`${styles.button} ${
            selectData && selectData?.length <= 0 && styles.disabled
          }`}
          onClick={() =>
            setopen({
              ...open,
              isApprove: true,
            })
          }
          disabled={selectData && selectData?.length <= 0}
        >
          Approve
        </button>
      </div>

      <ApproveModal
        open={open?.isApprove}
        handleClose={() => {
          setopen({
            isVisible: false,
            isApprove: false,
            trData: {},
          });
          setnotes(null);
        }}
        id={trData?.id}
        title=""
        handleApprove={handleApprove}
        notes={notes}
        setnotes={setnotes}
      />

      <Modal
        open={open?.isVisible}
        handleClose={() => {
          setopen({
            isVisible: false,
            trData: {},
          });
          setnotes(null);
        }}
        id={trData?.id}
        title={`Name: ${trData?.name_adhar}`}
        handleApprove={handleApprove}
        notes={notes}
        setnotes={setnotes}
      >
        <div className={styles.contentarea}>
          <div>
            <label>Current CTC</label>
            <p>{trData?.current_ctc}</p>
          </div>
          <div>
            <label>Expected CTC</label>
            <p>{trData?.expected_ctc}</p>
          </div>
          <div>
            <label>Monthly CTC</label>
            <p>{trData?.monthly_ctc}</p>
          </div>
          <div>
            <label>Adhar No:</label>
            <p>{trData?.adhar_no}</p>
          </div>
          <div>
            <label>Adhar Card:</label>
            <p onClick={() => downloadPdfBlob(trData?.adhar_card)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label>Pan No:</label>
            <p>{trData?.pan_no}</p>
          </div>
          <div>
            <label>Pan Card:</label>
            <p onClick={() => downloadPdfBlob(trData?.pan_card)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label>Cancel Cheque:</label>
            <p onClick={() => downloadPdfBlob(trData?.cancel_cheque)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label>CV:</label>
            <p>{trData?.updated_cv}</p>
            <p onClick={() => downloadPdfBlob(trData?.upload_cv)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label>Passport Pic:</label>

            <p onClick={() => downloadPdfBlob(trData?.passport_pic)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label>Current Company Offer</label>
            <p onClick={() => downloadPdfBlob(trData?.current_company_offer)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label>Current Company Hike</label>
            <p>{trData?.current_company_hike}</p>
          </div>
          <div>
            <label>Status</label>
            <p>{trData?.status}</p>
          </div>
          <div>
            <label>Adhar Status</label>
            <p>{trData?.adhar_status}</p>
          </div>
          <div>
            <label>Pan Status</label>
            <p>{trData?.pan_status}</p>
          </div>
          <div>
            <label>Cheque Status</label>
            <p>{trData?.cheque_status}</p>
          </div>
          <div>
            <label>CV Status</label>
            <p>{trData?.cv_status}</p>
          </div>
          <div>
            <label>Payslips Status</label>
            <p>{trData?.payslips_status}</p>
          </div>
          <div>
            <label>Photo Status</label>
            <p>{trData?.photo_status}</p>
          </div>
          <div>
            <label>Offer Status</label>
            <p>{trData?.offer_status}</p>
          </div>
          <div>
            <label>Hike Status</label>
            <p>{trData?.hike_status}</p>
          </div>
          <div>
            <label>Recruiter Name</label>
            <p>{trData?.recruiter_name}</p>
          </div>
          <div>
            <label>HR Manager</label>
            <p>{trData?.hr_manager}</p>
          </div>
          <div>
            <label>Reporting Manager</label>
            <p>{trData?.reporting_manager}</p>
          </div>

          <div>
            <label>Applicant ID</label>
            <p>{trData?.applicant_id}</p>
          </div>
          <div>
            <label>Applicant Email</label>
            <p>{trData?.applicant_email}</p>
          </div>
          <div>
            <label>Experience</label>
            <p>{trData?.experiance}</p>
          </div>
          <div>
            <label>File</label>
            <p onClick={() => downloadPdfBlob(trData?.file)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label>UAN Number</label>
            <p>{trData?.uan_number}</p>
          </div>
          <div>
            <label>Emergency Name</label>
            <p>{trData?.emergancy_name}</p>
          </div>
          <div>
            <label>Emergency Contact</label>
            <p>{trData?.emergancy_contact}</p>
          </div>
          <div>
            <label>Date</label>
            <p>{trData?.date}</p>
          </div>
          <div>
            <label>Division</label>
            <p>{trData?.division}</p>
          </div>
          <div>
            <label>Req ID</label>
            <p>{trData?.req_id}</p>
          </div>
          <div>
            <label>Req Date</label>
            <p>{trData?.req_date}</p>
          </div>
          <div>
            <label>Req Name</label>
            <p>{trData?.req_name}</p>
          </div>
          <div>
            <label>Designation</label>
            <p>{trData?.designation}</p>
          </div>
          <div>
            <label>Dep Type</label>
            <p>{trData?.dep_type}</p>
          </div>
          <div>
            <label>BU Type</label>
            <p>{trData?.bu_type}</p>
          </div>
          <div>
            <label>Dep Location</label>
            <p>{trData?.dep_location}</p>
          </div>
          <div>
            <label>Lead Name</label>
            <p>{trData?.lead_name}</p>
          </div>
          <div>
            <label>Working Mode</label>
            <p>{trData?.working_mode}</p>
          </div>
          <div>
            <label>R Experience</label>
            <p>{trData?.r_experience}</p>
          </div>
          <div>
            <label>EN CTC</label>
            <p>{trData?.en_ctc}</p>
          </div>
          <div>
            <label>DOJ</label>
            <p>{trData?.doj}</p>
          </div>
          <div>
            <label>Client Name</label>
            <p>{trData?.client_name}</p>
          </div>
          <div>
            <label>Letter Status</label>
            <p>{trData?.letter_status}</p>
          </div>
          <div>
            <label>C Mode</label>
            <p>{trData?.c_mode}</p>
          </div>
          <div>
            <label>C Hike</label>
            <p>{trData?.c_hike}</p>
          </div>
          <div>
            <label>Note</label>
            <p>{trData?.note}</p>
          </div>
          <div>
            <label>RL</label>
            <p>{trData?.rl}</p>
          </div>
          <div>
            <label>Relieving Letter</label>
            <p onClick={() => downloadPdfBlob(trData?.relieving_letter)}>
              <img src={DownloadIcon} width={24} height={24} />
            </p>
          </div>
          <div>
            <label>RL Status</label>
            <p>{trData?.rl_status}</p>
          </div>
          <div>
            <label>C Company</label>
            <p>{trData?.c_company}</p>
          </div>
          <div>
            <label>Position C</label>
            <p>{trData?.position_c}</p>
          </div>
          <div>
            <label>U Type</label>
            <p>{trData?.u_type}</p>
          </div>
          <div>
            <label>Address</label>
            <p>{trData?.address}</p>
          </div>
          <div>
            <label>Validation Status</label>
            <p>{trData?.validation_status}</p>
          </div>
          <div>
            <label>Interviewer Name</label>
            <p>{trData?.interviewer_name}</p>
          </div>
          <div>
            <label>UAN Status</label>
            <p>{trData?.uan_status}</p>
          </div>
          <div>
            <label>Prev Client Name</label>
            <p>{trData?.prev_client_name}</p>
          </div>
          <div>
            <label>Validation Note</label>
            <p>{trData?.validation_note}</p>
          </div>
          <div>
            <label>C Location</label>
            <p>{trData?.c_location}</p>
          </div>
          <div>
            <label>Applicant Loc</label>
            <p>{trData?.applicant_loc}</p>
          </div>
          <div>
            <label>Prev Client Name 2</label>
            <p>{trData?.prev_client_name2}</p>
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

export default ApplicantAwaiting;
