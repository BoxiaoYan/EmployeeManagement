import { useState, useEffect } from "react";
import { Typography, Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchEmployeeByVisa } from "../../services/hr";

import InProgressVisa from "./InProgressVisa";
import AllVisa from "./AllVisa";
import styles from "./style.module.css";

export default function HrVisaStatusManagement() {
  const { Title } = Typography;

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("InProgress");

  const [employees, setEmployees] = useState([]);
  const [fileChange, setFileChange] = useState(false);

  const position = useSelector((state) => state.user.user.position);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Check Authentication
    if (position !== "hr") {
      navigate("/error/not-authorized");
    }
    // Load the search result from localStorage
    const storedTab = localStorage.getItem("visaStatusTab");
    if (storedTab) {
      setStatus(storedTab);
    }

    fetchEmployeeByVisa(setEmployees, navigate);
    fetchEmployeeByVisa(setEmployees, navigate);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileChange]);

  const refresh = () => {
    setFileChange(!fileChange);
  };

  const handleSetTab = (key) => {
    setStatus(key);
    localStorage.setItem("visaStatusTab", key);
  };

  const items = [
    {
      key: "InProgress",
      label: "In Progress",
      children: (
        <InProgressVisa
          employees={employees}
          search={search}
          setSearch={setSearch}
          fileChange={fileChange}
          refresh={refresh}
        />
      ),
    },
    {
      key: "All",
      label: "All",
      children: (
        <AllVisa employees={employees} search={search} setSearch={setSearch} />
      ),
    },
  ];

  return (
    <>
      <Title className={styles.title}>Visa Status Management</Title>

      <div className={styles.tab}>
        <Tabs
          activeKey={status}
          defaultActiveKey="Registration Token"
          items={items}
          size="large"
          onChange={handleSetTab}
        />
      </div>
    </>
  );
}