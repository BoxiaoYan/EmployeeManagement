import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";

import { verifyRegLink } from "../../services/auth";

import OnboardingApplicationReview from "./OnboardingApplicationReview";
import styles from "./style.module.css";

// HiringManagementPage
export default function HiringManagementPage() {

  
const items = [
  { key: "1", label: "Registration Token", children: "Hello" },
  { key: "2", label: "Onboarding Application Review", children: <OnboardingApplicationReview /> },

];

  
  
  return (
    <>
    <Tabs
        defaultActiveKey="2"
        items={items}
        size="large"
      />
    </>
  )
}