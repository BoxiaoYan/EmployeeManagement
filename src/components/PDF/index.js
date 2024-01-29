import { message } from "antd";
import { FaFilePdf } from "react-icons/fa";

import apiCall from "../../services/api";

export default function PDF({ fileName, userID }) {
  const BASE_URL = `http://localhost:${process.env.PORT || 8080}`;

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const downloadFile = async (fileName, userID) => {
    const fileUrl = `${BASE_URL}/api/get_file/${fileName}/${userID}`;
    try {
      const response = await fetch(fileUrl, { headers });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      message.error("Error downloading file");
    }
  };

  // const fetchPreview() = async () => {
  //   try {
  //     const response = await fetch('your-pdf-api-endpoint');
  //     const pdfData = await response.arrayBuffer();
  //     const pdfBuffer = Buffer.from(pdfData);
  //     setPdfBuffer(pdfBuffer);
  //   } catch (error) {
  //     console.error('Error fetching PDF data:', error);
  //   }
  // };

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a onClick={() => downloadFile(fileName, userID)}>
      <FaFilePdf />
      <span>{`${fileName}.pdf`}</span>
    </a>
  );
}
