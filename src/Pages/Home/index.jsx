/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import styles from "./index.module.scss";
import WavingHand from "../../assets/waving-hand.gif";
import Awaiting from "../../assets/awaiting.png";
import Campaign from "../../assets/campaign.png";
import Nda from "../../assets/nda.png";
import Interview from "../../assets/interview.png";
import Client from "../../assets/client-meeting.png";
import Payment from "../../assets/payment-request.webp";

const itemData = [
  {
    title: "Applicant Awaiting",
    key: "applicant-awaiting",
    icon: Awaiting,
  },
  // {
  //   title: "DMM Campaign",
  //   key: "dmm-campaign",
  //   icon: Campaign,
  // },
  {
    title: "Payment Request",
    key: "payment-request",
    icon: Payment,
  },
  {
    title: "NDA",
    key: "nda",
    icon: Nda,
  },
  {
    title: "Client Meeting",
    key: "client-meeting",
    icon: Client,
  },
  {
    title: "Interview Tracker",
    key: "interview-tracker",
    icon: Interview,
  },
];
const Home = () => {
  const navigate = useNavigate();
  const Card = ({ item }) => {
    console.log(item);
    return (
      <div className={styles.card} onClick={() => navigate(`/${item.key}`)}>
        <img src={item?.icon} />
        <h2>{item?.title} </h2>
      </div>
    );
  };
  return (
    <div className={styles.homeContainer}>
      <div className={styles.titleArea}>
        <h1>
          Welcome Back, Admin <img src={WavingHand} width={40} />
        </h1>
      </div>
      <div className={styles.title}>
        <h2>List of Applications</h2>
        <p>Sample text</p>
      </div>
      <div className={styles.listItemsArea}>
        {itemData?.map((e) => {
          return <Card item={e} />;
        })}
      </div>
    </div>
  );
};

export default Home;
