import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

import apiCall from "../../services/api";

const FileUpload = ({ filename, userID }) => {
  const [, setFile] = useState(null);

  const onChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    const data = { filename, file, contentType: file.type, userID };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/save_file",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // const response = await apiCall({
      //   url: "/api/save_file",
      //   method: "POST",
      //   data
      // });

      // Assuming the backend returns the file path or ID
      setFile(response.data.filePath);

      onSuccess();
    } catch (error) {
      console.error("File upload failed:", error);
      onError(error);
    }
  };

  return (
    <Upload
      customRequest={customRequest}
      showUploadList={false}
      onChange={onChange}
    >
      <Button icon={<UploadOutlined />}>Upload pdf</Button>
    </Upload>
  );
};

export default FileUpload;
