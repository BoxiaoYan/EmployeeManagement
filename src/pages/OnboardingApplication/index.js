import { useEffect, useState } from "react";
import { Tabs } from "antd";

import TokenList from "./TokenList";
import OnboardingApplicationReview from "./OnboardingApplicationReview";
import styles from "./style.module.css";

// HiringManagementPage
export default function HiringManagementPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Registration Token");

  const items = [
    {
      key: "1",
      label: "Registration Token",
      children: <TokenList search={search} setSearch={setSearch} />,
    },
    {
      key: "2",
      label: "Onboarding Application Review",
      children: (
        <OnboardingApplicationReview search={search} setSearch={setSearch} />
      ),
    },
  ];

  useEffect(() => {
    // Load the search result from localStorage
    const storedTab2 = localStorage.getItem("hiringManagementTab1");
    if (storedTab2) {
      setStatus(storedTab2);
    }
  }, []);

  return (
    <>
      <Tabs
        className={styles.tab}
        activeKey={status}
        defaultActiveKey="Registration Token"
        items={items}
        size="large"
        onChange={(key) => {
          setStatus(key);
          localStorage.setItem("hiringManagementTab1", key);
        }}
      />
    </>
  );
}