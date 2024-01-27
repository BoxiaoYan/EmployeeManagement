import { message } from "antd";
import { FaFilePdf } from "react-icons/fa";

export default function PDF({ filename, userID }) {
  const BASE_URL = `http://localhost:${process.env.PORT || 8080}`;

  const downloadFile = (filename, userID) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const fileUrl = `${BASE_URL}/api/get_file/${filename}/${userID}`;

    fetch(fileUrl, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${filename}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        message.error("Error downloading file");
      });
  };

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a onClick={() => downloadFile(filename, userID)}>
      <FaFilePdf />
      <span>{`${filename}.pdf`}</span>
    </a>
  );
}
