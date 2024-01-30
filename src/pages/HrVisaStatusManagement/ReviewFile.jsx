import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import { reviewVisaFile } from "../../services/hr";

import PDF from "../../components/PDF";
import styles from "./style.module.css";

export default function ReviewFile({ visa, refresh }) {
  const [feedback, setFeedback] = useState("");
  const [fileName, setFileName] = useState("");
  const [ifReject, setIfReject] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (visa.opt_receipt === "Pending") {
      setFileName("opt_receipt");
    } else if (visa.opt_ead === "Pending") {
      setFileName("opt_ead");
    } else if (visa.i983 === "Pending") {
      setFileName("i983");
    } else {
      setFileName("i20");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = () => {
    const data = {
      userID: visa.user,
      fileName,
      action: ifReject ? "Rejected" : "Approved",
      feedback: ifReject ? feedback : "",
    };
    reviewVisaFile(data, navigate);
    refresh();
  };

  return (
    <>
      <div className={styles.review}>
        <PDF fileName={fileName} userID={visa.user} />
        {!ifReject && (
          <div className={styles.reviewButtonContainer}>
            <Button
              className={styles.button}
              type="primary"
              onClick={() => handleAction()}
            >
              Approve
            </Button>
            <Button
              className={styles.button}
              type="primary"
              danger
              onClick={() => setIfReject(true)}
            >
              Reject
            </Button>
          </div>
        )}
      </div>
      {ifReject && (
        <div className={styles.feedback}>
          <Input.TextArea
            className={styles.input}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
          <div className={styles.rejectButtonContainer}>
            <Button
              className={styles.button}
              type="primary"
              onClick={() => handleAction()}
            >
              Send
            </Button>
            <Button
              className={styles.button}
              danger
              onClick={() => setIfReject(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
