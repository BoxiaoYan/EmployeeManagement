import { useEffect, useState } from "react";
import { Tabs } from "antd";

import ReviewTable from "./ReviewTable";
import styles from "./style.module.css";

// HiringManagementPage
export default function OnboardingApplicationReview({ search, setSearch }) {
  const [status, setStatus] = useState("Pending");

  const items = [
    {
      key: "Pending",
      label: "Pending",
      children: (
        <ReviewTable status={status} search={search} setSearch={setSearch} />
      ),
    },
    {
      key: "Rejected",
      label: "Rejected",
      children: (
        <ReviewTable status={status} search={search} setSearch={setSearch} />
      ),
    },
    {
      key: "Approved",
      label: "Approved",
      children: (
        <ReviewTable status={status} search={search} setSearch={setSearch} />
      ),
    },
  ];

  useEffect(() => {
    // Load the search result from localStorage
    const storedTab2 = localStorage.getItem("hiringManagementTab2");
    if (storedTab2) {
      setStatus(storedTab2);
    }
  }, []);

  return (
    <>
      {/** Navigation Bar */}
      <Tabs
        className={styles.tab}
        activeKey={status}
        defaultActiveKey="Pending"
        items={items}
        size="large"
        onChange={(key) => {
          setStatus(key);
          localStorage.setItem("hiringManagementTab2", key);
        }}
      />
    </>
  );
}