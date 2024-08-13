/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable */

import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../config";
import Title from "../../CommonComponents/Title/title";
import Card from "../../CommonComponents/Card/card";
import Modal from "../../components/Modal/modal";
import Badge from "../../CommonComponents/Badge/Badge";

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
    trData: {},
  });
  const [data, setdata] = useState([]);

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

  const GetCard = ({ items }) => {
    console.log(items);
    return (
      <div className="mb-5">
        <Card>
          <div className={styles.row}>
            <div className={styles.title}>
              Name:
              <span>{items?.name_adhar}</span>
            </div>
            {/* <div>
              <Badge
                title={items?.status}
                varriant={items?.status?.toLowerCase()}
              />
            </div> */}
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Status: <span>{items?.status}</span>
            </div>
            {/* <div className={styles.title}>
              Email: <span>{items?.email}</span>
            </div> */}
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
              Current CTC <span>{styles?.current_ctc}</span>
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

  const trData = open?.trData;
  return (
    <div className={styles.container}>
      <Title varriant="h1" title="Applicant Waiting" />
      <Modal
        open={open?.isVisible}
        handleClose={() =>
          setopen({
            isVisible: false,
            trData: {},
          })
        }
        title="Tr. No: 12233123"
      >
        <div className={styles.contentarea}>
          <div>
            <label>Name:</label>
            <p>{trData?.name_adhar}</p>
          </div>
          <div>
            <label>Adhar No:</label>
            <p>{trData?.adhar_no}</p>
          </div>
          <div>
            <label>Adhar Card:</label>
            <p>{trData?.adhar_card}</p>
          </div>
          <div>
            <label>Pan No:</label>
            <p>{trData?.pan_no}</p>
          </div>
          <div>
            <label>Pan Card:</label>
            <p>{trData?.pan_card}</p>
          </div>
          <div>
            <label>Cancel Cheque:</label>
            <p>{trData?.cancel_cheque}</p>
          </div>
          <div>
            <label>CV:</label>
            <p>{trData?.updated_cv}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>

          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
          <div>
            <label>Payslips:</label>
            <p>{trData?.payslips}</p>
          </div>
        </div>
      </Modal>
      <div className={styles.area}>
        {data?.map((items) => (
          <GetCard items={items} />
        ))}
      </div>
    </div>
  );
};

export default ApplicantAwaiting;
