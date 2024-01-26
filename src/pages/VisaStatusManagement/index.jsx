import { useState, useEffect } from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { FaFilePdf } from "react-icons/fa";
import { fetchVisaStatus } from "../../services/visa";

import FileTable from "./FileTable";

import styles from "./style.module.css";

export default function VisaStatusManagement() {
  const { Title, Text } = Typography;
  const [fileChange, setFileChange] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [optRecStatus, setOptRecStatus] = useState("Unsubmitted");
  const [eadStatus, setEadStatus] = useState("Unsubmitted");
  const [i983Status, setI983Status] = useState("Unsubmitted");
  const [i20Status, setI20Status] = useState("Unsubmitted");

  const userID = useSelector((state) => state.user.user.id || null);

  useEffect(() => {
    fetchVisaStatus(
      userID,
      setOptRecStatus,
      setEadStatus,
      setI983Status,
      setI20Status
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileChange]);

  const refresh = () => {
    setFileChange(!fileChange);
  };

  const optRecStatusProps = {
    userID,
    title: "OPT Receipt",
    filename: "opt_receipt",
    status: optRecStatus,
    message: {
      unsubmitted: "Please upload a copy of your OPT Receipt.", 
      pending: "Pending: Waiting for HR to approve your OPT Receipt",
      rejected: "Rejected: " + feedback,
      approved: "Approved",
    },
    isDisable: false,
    refresh,
    extraFile: undefined
  }

  const eadStatusProps = {
    userID,
    title: "OPT EAD",
    filename: "opt_ead",
    status: eadStatus,
    message: {
      unsubmitted: "Please upload a copy of your OPT EAD.", 
      pending: "Pending: Waiting for HR to approve your OPT EAD",
      rejected: "Rejected: " + feedback,
      approved: "Approved",
    },
    isDisable: optRecStatus !== "Approved",
    refresh,
    extraFile: undefined
  }

  const i983StatusProps = {
    userID,
    title: "I-983",
    filename: "i938",
    status: i983Status,
    message: {
      unsubmitted: "Please upload a copy of your I-983.", 
      pending: "Pending: Waiting for HR to approve your I-983",
      rejected: "Rejected: " + feedback,
      approved: "Approved: Please send the I-983 along with all necessary documents to your school and upload the new I-20",
    },
    isDisable: eadStatus !== "Approved",
    refresh,
    extraFile: undefined
  }

  const i20StatusProps = {
    userID,
    title: "I-20",
    filename: "i20",
    status: i20Status,
    message: {
      unsubmitted: "Please upload a copy of your I-20.", 
      pending: "Pending: Waiting for HR to approve your I-20",
      rejected: "Rejected: " + feedback,
      approved: "All documents have been approved",
    },
    isDisable: i983Status !== "Approved" ,
    refresh,
    extraFile: undefined
  }

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <Title>Visa Status Management</Title>
        <Text italic>Please follow the document order one by one.</Text>
        {/* opt receipt */}
        <FileTable props={optRecStatusProps}/>

        {/* optead */}
        <FileTable props={eadStatusProps}/>

        {/* i-983 */}
        <FileTable props={i983StatusProps}/>
        {/* <div className={styles.section}>
          <Text strong>I-983</Text>
          {i983Status !== "" ? (
            <Text>status: {i983Status}</Text>
          ) : (
            <Text>status: Not submitted</Text>
          )}
          <div className={styles.pdf}>
            <a href="/blank.pdf" download="Empty Template.pdf">
              <FaFilePdf />
              <span>Empty Template</span>
            </a>
            <a href="/blank.pdf" download="Sample Template.pdf">
              <FaFilePdf />
              <span>Sample Template</span>
            </a>
          </div>
          {i983Status === "pending" ? (
            <Text>Waiting for HR to approve your I983</Text>
          ) : i983Status === "rejected" ? (
            <Text>HR feedback</Text>
          ) : i983Status === "approved" &&
            eadStatus === "approved" &&
            optRecStatus === "approved" ? (
            <form className={styles.submitForm} onSubmit={() => {}}>
              <Text>
                Please send the I-983 along with all necessary documents to your
                school and upload the new I-20
              </Text>
              <input type="file" name="i20Form" />
              <input type="submit" />
            </form>
          ) : eadStatus === "approved" ? (
            <form className={styles.submitForm} onSubmit={() => {}}>
              <input type="file" name="i983Form" />
              <input type="submit" />
            </form>
          ) : (
            <Text>
              Please wait for the previous document to be approved before you
              submit i-983.
            </Text>
          )}
        </div> */}

        {/* i-20 */}
        <FileTable props={i20StatusProps}/>
      </div>
    </div>
  );
}
