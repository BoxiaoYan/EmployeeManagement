import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export default function SessionExpired() {
  return (
    <Result
      title="Your session has expired. Please log in again."
      extra={
        <Link to="/login">
          <Button type="primary" key="console">
            Log in
          </Button>
        </Link>
      }
    />
  );
}