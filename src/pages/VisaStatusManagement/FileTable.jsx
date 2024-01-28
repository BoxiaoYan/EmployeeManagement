import { Typography } from "antd";

import PDF from "../../components/PDF";
import FileUpload from "../../components/FileUpload";

import styles from "./style.module.css";

export default function FileTable({ props }) {
  const {
    userID,
    title,
    fileName,
    status,
    message,
    isDisable,
    refresh,
    extraFile,
  } = props;
  const { Text } = Typography;

  const BASE_URL = `http://localhost:${process.env.PORT || 8080}`;
  const postUrl = BASE_URL + "/api/save_file";

  return (
    <div className={styles.section}>
      <Text className={styles.title}>{title}</Text>
      <Text className={styles.message}>
        {isDisable
          ? "Waiting for last file to be approved."
          : status === "Unsubmitted"
          ? message.unsubmitted
          : status === "Pending"
          ? message.pending
          : status === "Rejected"
          ? message.rejected
          : message.approved}
      </Text>
      {extraFile && !isDisable && (
        <div className={styles.pdf}>
          {extraFile.map((fileName, index) => (
            <PDF key={index} fileName={fileName} userID={userID} />
          ))}
        </div>
      )}
      {status !== "Approved" && !isDisable && (
        <FileUpload
          fileName={fileName}
          userID={userID}
          url={postUrl}
          refresh={refresh}
        />
      )}
      {(status === "Pending" || status === "Approved") && (
        <PDF
          className={styles.uploadFile}
          fileName={fileName}
          userID={userID}
        />
      )}
    </div>
  );
}
