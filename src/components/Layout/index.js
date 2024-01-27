import React, { useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import { blue, gray } from "@ant-design/colors";

import Navbar from "../Navbar";

export default function MainLayout() {
  const headerStyle = useMemo(
    () => ({
      width: "100%",
      height: "64px",
      color: "white",
      lineHeight: "64px",
      backgroundColor: blue[6],
      padding: "0 50px",
      marginBottom: "24px",
      borderBottom: `1px solid ${blue[4]}`,
      boxShadow: `0 2px 8px ${gray[3]}`,
    }),
    []
  );

  const contentStyle = useMemo(
    () => ({
      height: "calc(100vh - 64px - 69px)",
      padding: "0 50px",
      width: "100%",
      margin: "0 auto",
      overflowY: "auto",
    }),
    []
  );

  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return (
    <Layout>
      <Layout.Header style={headerStyle}>
        <Navbar />
      </Layout.Header>
      <Layout.Content style={contentStyle}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}
