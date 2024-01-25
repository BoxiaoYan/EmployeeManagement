import React from "react";
import { Result } from "antd";

export default function RegLinkExpired({errorMsg}) {
  return (
    <Result
      style={{ marginTop: "20%" }}
      title={errorMsg}
    />
  );
}
