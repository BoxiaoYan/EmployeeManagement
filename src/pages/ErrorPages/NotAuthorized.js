import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Result, Button } from "antd";

export default function NotAuthorized() {
  const position = useSelector((state) => state.user.user.position);

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Link to={position === "hr" ? "/" : "/visa-status-management"}>
          <Button type="primary" size="large">
            Back Home
          </Button>
        </Link>
      }
    />
  );
}
