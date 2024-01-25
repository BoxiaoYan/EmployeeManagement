import { Tabs } from "antd";

import ReviewTable from "./ReviewTable";
import styles from "./style.module.css";
import { useState } from "react";

// HiringManagementPage
export default function OnboardingApplicationReview() {
  const [status, setStatus] = useState("Pending");

  const items = [
    {
      key: "Pending",
      label: "Pending",
      children: <ReviewTable status={status} />,
    },
    {
      key: "Rejected",
      label: "Rejected",
      children: <ReviewTable status={status} />,
    },
    {
      key: "Approved",
      label: "Approved",
      children: <ReviewTable status={status} />,
    },
  ];

  // useEffect(())

  return (
    <>
      <Tabs
        defaultActiveKey={status}
        items={items}
        size="large"
        onChange={(key) => setStatus(key)}
      />
    </>
  );
}
