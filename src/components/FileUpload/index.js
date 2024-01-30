import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const FileUpload = ({ fileName, url, refresh }) => {
  const onChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    const data = { fileName, file, contentType: file.type };
    try {
      // Backend api call to save the file
      await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      refresh();
      onSuccess();
    } catch (error) {
      console.error("File upload failed:", error);
      onError(error);
    }
  };

  return (
    <>
      <Upload
        customRequest={customRequest}
        showUploadList={false}
        onChange={onChange}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  );
};

export default FileUpload;