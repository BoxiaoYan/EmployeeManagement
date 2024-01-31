import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Result, Button } from "antd";

export default function NotFound() {
  const position = useSelector((state) => state.user.user.position);
  const userID = useSelector((state) => state.user.user.id || null);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link
          to={
            position === "hr"
              ? "/employee-profile-summary"
              : `/onboarding-application/${userID}`
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
