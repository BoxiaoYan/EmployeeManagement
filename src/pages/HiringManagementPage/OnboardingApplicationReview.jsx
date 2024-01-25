import { Tabs } from "antd";

import ReviewTable from "./ReviewTable";
import styles from "./style.module.css";
import { useState } from "react";

// HiringManagementPage
export default function OnboardingApplicationReview() {
  const [appStatus, setAppStatus] = useState("Pending");

  const items = [
    {
      key: "Pending",
      label: "Pending",
      children: <ReviewTable appStatus={appStatus} />,
    },
    {
      key: "Rejected",
      label: "Rejected",
      children: <ReviewTable appStatus={appStatus} />,
    },
    {
      key: "Approved",
      label: "Approved",
      children: <ReviewTable appStatus={appStatus} />,
    },
  ];

  // useEffect(())

  return (
    <>
      <Tabs
        defaultActiveKey={appStatus}
        items={items}
        size="large"
        onChange={(key) => setAppStatus(key)}
      />
    </>
  );
}