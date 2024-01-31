import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Result, Button } from "antd";

export default function ErrorPage() {
  const position = useSelector((state) => state.user.user.position);
  const userId = useSelector((state) => state.user.user.id || null);

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link
          to={
            position === "hr"
              ? "/employee-profile-summary"
              : `/onboarding-application/${userId}`
          }
        >
          <Button type="primary" size="large">
            Back Home
          </Button>
        </Link>
      }
    />
  );
}
