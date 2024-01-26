import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";

import TokenList from "./TokenList";
import OnboardingApplicationReview from "./OnboardingApplicationReview";
import styles from "./style.module.css";

// HiringManagementPage
export default function HiringManagementPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Registration Token");

  const position = useSelector((state) => state.user.user.position);
  const navigate = useNavigate();

  // Authentication Check
  if (position !== "hr") {
    navigate("/error/not-authorized")
  }

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
