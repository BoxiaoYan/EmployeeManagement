import { useState, useEffect } from "react";
import { Button, message } from "antd";
import { FaFilePdf } from "react-icons/fa";
import { DownloadOutlined } from "@ant-design/icons";

import PDFViewer from "./PDFViewer";

export default function PDF({ fileName, userID }) {
  const BASE_URL = `http://localhost:${process.env.PORT || 8080}`;
  const fileUrl = `${BASE_URL}/api/get_file/${fileName}/${userID}`;

  const [pdfUrl, setPdfUrl] = useState(null);
  const [showPdf, setShowPdf] = useState(false);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const getFile = async () => {
    try {
      const response = await fetch(fileUrl, { headers });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      setPdfUrl(url);
    } catch (error) {
      message.error("Error downloading file");
    }
  };

  useEffect(() => {
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("download", `${fileName}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
      {
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => setShowPdf(!showPdf)}>
          <FaFilePdf />
          <span>{`${fileName}.pdf`}</span>
        </a>
      }
      <Button
        type="primary"
        shape="circle"
        size="small"
        icon={<DownloadOutlined />}
        onClick={() => downloadFile()}
      />
      <PDFViewer
        pdf={pdfUrl}
        onCancel={() => setShowPdf(false)}
        visible={showPdf}
      />
    </div>
  );
}
