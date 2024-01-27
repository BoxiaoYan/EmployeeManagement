import { Typography } from "antd";
import { FaFilePdf } from "react-icons/fa";

import FileUpload from "../../components/FileUpload";

import styles from "./style.module.css";

export default function FileTable({ props }) {
  const {
    userID,
    title,
    filename,
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
          {extraFile.map((file, index) => (
            <a key={index} href={file.link} download={file.name}>
              <FaFilePdf />
              <span>{file.name}</span>
            </a>
          ))}
        </div>
      )}
      {status !== "Approved" && !isDisable && (
        <FileUpload
          filename={filename}
          userID={userID}
          url={postUrl}
          refresh={refresh}
        />
      )}
      {(status === "Pending" || status === "Approved") && (
        <a
          key={title}
          className={styles.uploadFile}
          href={`${BASE_URL}/api/get_file/${filename}/${userID}`}
          download={`${filename}.pdf`}
        >
          <FaFilePdf />
          <span>{`${filename}.pdf`}</span>
        </a>
      )}
    </div>
  );
}
