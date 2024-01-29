import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";

import { fetchVisaStatus } from "../../services/visa";
import FileTable from "./FileTable";
import styles from "./style.module.css";

export default function VisaStatusManagement() {
  const { Title, Text } = Typography;

  const [fileChange, setFileChange] = useState(false);

  const [notOPT, setNotOPT] = useState("");
  const [feedback, setFeedback] = useState("");
  const [optRecStatus, setOptRecStatus] = useState("Unsubmitted");
  const [eadStatus, setEadStatus] = useState("Unsubmitted");
  const [i983Status, setI983Status] = useState("Unsubmitted");
  const [i20Status, setI20Status] = useState("Unsubmitted");

  const userID = useSelector((state) => state.user.user.id || null);
  const position = useSelector((state) => state.user.user.position);
  const navigate = useNavigate();

  useEffect(() => {
    // Check Authentication
    if (position !== "employee") {
      navigate("/error/not-authorized");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchVisaStatus(
      setNotOPT,
      setOptRecStatus,
      setEadStatus,
      setI983Status,
      setI20Status,
      setFeedback,
      navigate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileChange]);

  const refresh = () => {
    setFileChange(!fileChange);
  };

  const optRecStatusProps = {
    userID,
    title: "OPT Receipt",
    fileName: "opt_receipt",
    status: optRecStatus,
    message: {
      unsubmitted: "Please upload a copy of your OPT Receipt.",
      pending: "Pending: Waiting for HR to approve your OPT Receipt.",
      rejected: "Rejected: " + feedback,
      approved: "Approved.",
    },
    isDisable: false,
    refresh,
    extraFile: undefined,
  };

  const eadStatusProps = {
    userID,
    title: "OPT EAD",
    fileName: "opt_ead",
    status: eadStatus,
    message: {
      unsubmitted: "Please upload a copy of your OPT EAD.",
      pending: "Pending: Waiting for HR to approve your OPT EAD.",
      rejected: "Rejected: " + feedback,
      approved: "Approved.",
    },
    isDisable: optRecStatus !== "Approved",
    refresh,
    extraFile: undefined,
  };

  const i983StatusProps = {
    userID,
    title: "I-983",
    fileName: "i983",
    status: i983Status,
    message: {
      unsubmitted: "Please download and fill out the I-983 form.",
      pending: "Pending: Waiting for HR to approve your I-983.",
      rejected: "Rejected: " + feedback,
      approved:
        "Approved: Please send the I-983 along with all necessary documents to your school and upload the new I-20.",
    },
    isDisable: eadStatus !== "Approved",
    refresh,
    extraFile: ["empty_template", "sample_template"],
  };

  const i20StatusProps = {
    userID,
    title: "I-20",
    fileName: "i20",
    status: i20Status,
    message: {
      unsubmitted: "Please upload a copy of your I-20.",
      pending: "Pending: Waiting for HR to approve your I-20.",
      rejected: "Rejected: " + feedback,
      approved: "All documents have been approved.",
    },
    isDisable: i983Status !== "Approved",
    refresh,
    extraFile: undefined,
  };

  return notOPT ? (
    <div className={styles.notOPT}>
      {notOPT.split("\n").map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.table}>
        <Title>Visa Status Management</Title>
        <Text className={styles.message} italic>
          Please follow the document order one by one.
        </Text>
        {/* opt receipt */}
        <FileTable props={optRecStatusProps} />
        {/* optead */}
        <FileTable props={eadStatusProps} />
        {/* i-983 */}
        <FileTable props={i983StatusProps} />
        {/* i-20 */}
        <FileTable props={i20StatusProps} />
      </div>
    </div>
  );
}
