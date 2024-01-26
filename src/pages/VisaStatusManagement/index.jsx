import { useState } from "react";
import { Typography } from "antd";
import styles from "./style.module.css";
import { useSelector } from "react-redux";
import { FaFilePdf } from "react-icons/fa";
import FileUpload from "./FileUpload";

export default function VisaStatusManagement() {
  const { Title, Text } = Typography;
  const [optRecStatus, setOptRecStatus] = useState("Unsubmitted");
  const [eadStatus, setEadStatus] = useState("approved");
  const [i983Status, setI983Status] = useState("approved");
  const [i20Status, setI20Status] = useState("");

  const userID = useSelector((state) => state.user.user.id || null);

  // need check auth(token)
  // need to check work auth -> opt (if the button to this page will only be visible for opt employee,then it's optional )

  //  need fetch and set optRec status,
  //  if status is rejected,, fetch and set hr feedback
  //  if status is approved, when the submit click, sent ead to backend

  //  need fetch and set ead status,
  //  if status is rejected,, fetch and set hr feedback

  //  need to send i983 to backend once submit

  //  fetch and set i983 status,
  //  if status is rejected,, fetch and set hr feedback
  // if status is approved, when the submit click, sent i20 to backend

  //  need fetch and set i20 status,
  //  if status is rejected,, fetch and set hr feedback

  // current status would be 4 type: ''(never sent to HR), approved, rejected, pending

  const handleOptEadSubmit = (e) => {
    e.preventDefault();
    //need to check if the OPTEAD is successfully sent to hr, then set to pending
    setEadStatus("pending");
  };

  const handleI983Submit = (e) => {
    e.preventDefault();
    //need to check if the I983 is successfully sent to hr, then set to pending
    setI983Status("pending");
  };

  const handleI20Submit = (e) => {
    e.preventDefault();
    //need to check if the i20 is successfully sent to hr, then set to pending
    setI20Status("pending");
  };

  //   optReceipt: visaFileSchema,
  //   optEAD: visaFileSchema,
  //   i983: visaFileSchema,
  //   i20: visaFileSchema,

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <Title>Visa Status Management</Title>
        <Text italic>Please follow the document order one by one.</Text>
        {/* opt receipt */}
        <div className={styles.section}>
          <Text strong>OPT Receipt</Text>
          <Text>
            {optRecStatus === "Unsubmitted"
              ? "Please upload a copy of your OPT Receipt."
              : optRecStatus === "Pending"
              ? "Waiting for HR to approve your OPT Receipt"
              : optRecStatus === "Rejected"
              ? `Rejected. ${"resubmit"}`
              : eadStatus === "Approved"
              ? "Approved"
              : "Approved, Please upload a copy of your OPT EAD."}
          </Text>
          {(optRecStatus === "Unsubmitted" || optRecStatus === "Rejected") && (
            <FileUpload filename="optReceipt" userID={userID} />
          )}

          {/* {optRecStatus !== "Unsubmitted" ? (
            <Text>status: {optRecStatus}</Text>
          ) : (
            <Text>status: Not submitted</Text>
          )}
          {optRecStatus === "pending" ? (
            <Text>Waiting for HR to approve your OPT Receipt</Text>
          ) : optRecStatus === "rejected" ? (
            <Text>HR feedback</Text>
          ) : optRecStatus === "approved" && eadStatus === "rejected" ? (
            <form className={styles.submitForm} onSubmit={handleOptEadSubmit}>
              <Text>Please upload a copy of your OPT EAD.</Text>
              <input type="file" name="optead" />
              <input type="submit" value="Submit" />
            </form>
          ) : optRecStatus === "approved" && eadStatus === "approved" ? (
            <></>
          ) : optRecStatus === "approved" && eadStatus !== "pending" ? (
            <form className={styles.submitForm} onSubmit={handleOptEadSubmit}>
              <Text>Please upload a copy of your OPT EAD.</Text>
              <input type="file" name="optead" />
              <input type="submit" value="Submit" />
            </form>
          ) : (
            <></>
          )} */}
        </div>

        {/* optead */}
        <div className={styles.section}>
          <Text strong>OPT EAD</Text>
          {eadStatus !== "" ? (
            <Text>status: {eadStatus}</Text>
          ) : (
            <Text>status: Not submitted</Text>
          )}
          {eadStatus === "pending" ? (
            <Text>Waiting for HR to approve your OPT EAD</Text>
          ) : eadStatus === "rejected" ? (
            <Text>HR feedback</Text>
          ) : eadStatus === "approved" ? (
            <Text>Please download and fill out the I-983 form</Text>
          ) : (
            <></>
          )}
        </div>

        {/* i-983 */}
        <div className={styles.section}>
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
            <form className={styles.submitForm} onSubmit={handleI20Submit}>
              <Text>
                Please send the I-983 along with all necessary documents to your
                school and upload the new I-20
              </Text>
              <input type="file" name="i20Form" />
              <input type="submit" />
            </form>
          ) : eadStatus === "approved" ? (
            <form className={styles.submitForm} onSubmit={handleI983Submit}>
              <input type="file" name="i983Form" />
              <input type="submit" />
            </form>
          ) : (
            <Text>
              Please wait for the previous document to be approved before you
              submit i-983.
            </Text>
          )}
        </div>

        {/* i-20 */}
        <div className={styles.section}>
          <Text strong>I-20</Text>
          {i20Status !== "" ? (
            <Text>status: {i20Status}</Text>
          ) : (
            <Text>status: Not submitted</Text>
          )}
          {i20Status === "pending" ? (
            <Text>Waiting for HR to approve your I-20</Text>
          ) : i20Status === "rejected" ? (
            <Text>HR feedback</Text>
          ) : i20Status === "approved" ? (
            <Text>All documents have been approved.</Text>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
