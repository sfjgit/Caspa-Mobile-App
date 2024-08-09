/* eslint-disable react/jsx-key */
import { useState, Fragment } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Awaiting from "../../assets/awaiting.png";
import Campaign from "../../assets/campaign.png";
import Nda from "../../assets/nda.png";
import Interview from "../../assets/interview.png";
import Client from "../../assets/client-meeting.png";
import Payment from "../../assets/payment-request.webp";
import Close from "../../assets/close.svg";
import Home from "../../assets/home.svg";

import styles from "./drawer.module.scss";
import { useEffect } from "react";

const itemData = [
  {
    title: "Applicant Awaiting",
    key: "applicant-awaiting",
    icon: Awaiting,
  },
  {
    title: "DMM Campaign",
    key: "dmm-campaign",
    icon: Campaign,
  },
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

const Drawer = ({ open, handleClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          handleClose();
        }}
        className="relative z-50"
      >
        {/* <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={styles.transitionChildWrapper} />
        </TransitionChild> */}
        <div className={styles.modalMainWrapper}>
          <div className={styles.modalInsideWrap}>
            <div className={styles.modalContentMainWrap}>
              <DialogPanel className={styles.modalDialogMainWrap}>
                <div className={styles.modalContentWrap}>
                  <div className={styles.modalContentInnerWrap}>
                    <div className={styles.drawer}>
                      <div className={styles.header}>
                        <img src={Close} width={30} />
                      </div>
                      <ul>
                        <li>
                          {" "}
                          <img src={Home} width={24} />
                          Home
                        </li>
                        {itemData?.map((e) => {
                          return (
                            <li>
                              <img src={e?.icon} width={24} />
                              {e?.title}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
        {/* <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div> */}
      </Dialog>
    </>
  );
};

export default Drawer;
