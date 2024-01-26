import { useState, useEffect } from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { FaFilePdf } from "react-icons/fa";
import { fetchVisaStatus } from "../../services/visa";

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
      <Text strong>{title}</Text>
      <Text>
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
      <div className={styles.upload}>
        {status !== "Approved" && !isDisable && (
          <FileUpload
            filename={filename}
            userID={userID}
            url={postUrl}
            refresh={refresh}
          />
        )}
        <br />
        <br />
        {(status === "Pending" || status === "Approved") && (
          <a
            key={title}
            href={`${BASE_URL}/api/get_file/${filename}/${status}`}
            download={`${filename}.pdf`}
          >
            <FaFilePdf />
            <span>{`${filename}.pdf`}</span>
          </a>
        )}
      </div>
    </div>
  );
}
