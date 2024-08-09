/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable */

import Title from "../../CommonComponents/Title/title";
import Card from "../../CommonComponents/Card/card";
import Modal from "../../components/Modal/modal";
import Badge from "../../CommonComponents/Badge/Badge";

import ViewMore from "../../assets/viewmore.png";

import styles from "./index.module.scss";
import { useState } from "react";

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
  const [open, setopen] = useState(false);
  const GetCard = ({ items }) => {
    console.log(items);
    return (
      <div className="mb-5">
        <Card>
          <div className={styles.row}>
            <div className={styles.title}>
              Training No:
              <span>{items?.training_no}</span>
            </div>
            <div>
              <Badge
                title={items?.status}
                varriant={items?.status?.toLowerCase()}
              />
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Start Date: <span>{items?.start_date}</span>
            </div>
            <div className={styles.title}>
              End Date: <span>{items?.end_date}</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Type: <span>{styles?.type}</span>
            </div>
            <div className={styles.title}>
              Cost: <span>{items?.cost}</span>
            </div>
          </div>
          <div className={`${styles.row} ${styles.rowgap}`}>
            <div className={styles.title}>
              Client: <span>{items?.trainer_name}</span>
            </div>
            <div className={styles.expandIcon} onClick={() => setopen(true)}>
              View More <img src={ViewMore} width={24} />
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Title varriant="h1" title="Applicant Waiting" />
      <Modal
        open={open}
        handleClose={() => setopen(false)}
        title="Tr. No: 12233123"
      >
        <div className={styles.contentarea}>
          <div>
            <label>Training Name:</label>
            <p>{trData?.training_name}</p>
          </div>
          <div>
            <label>Client Name:</label>
            <p>{trData?.client_name}</p>
          </div>
          <div>
            <label>Start Date:</label>
            <p>{trData?.start_date}</p>
          </div>
          <div>
            <label>End Date:</label>
            <p>{trData?.end_date}</p>
          </div>
          <div>
            <label>Type:</label>
            <p>{trData?.type}</p>
          </div>
          <div>
            <label>Trainer Name:</label>
            <p>{trData?.trainer_name}</p>
          </div>
          <div>
            <label>Cost:</label>
            <p>{trData?.cost}</p>
          </div>
          <div>
            <label>Status:</label>
            <p>{trData?.status}</p>
          </div>
        </div>
      </Modal>
      <div className={styles.area}>
        {sampleData?.map((items) => (
          <GetCard items={items} />
        ))}
      </div>
    </div>
  );
};

export default ApplicantAwaiting;
