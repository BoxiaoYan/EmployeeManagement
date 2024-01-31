import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";


import { logOutUser } from "../../app/userSlice";

import styles from "./style.module.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const position = useSelector((state) => state.user.user.position);
  const username = useSelector((state) => state.user.user.username);
  const userID = useSelector((state) => state.user.user.id || null);

  const handleLogout = () => {
    dispatch(logOutUser());
    navigator("/login");
  };

  return (
    <div className={styles.layout}>
      <div className={styles.title}>
        <UserOutlined /> <span style={{marginLeft: 8}}>{username}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {position === "hr" ? (
          <>
            <Link className={styles.text} to="/hr-profile">
              Employee Profiles
            </Link>
            <Link className={styles.text} to="/employee-visa-status">
              Visa Status Management
            </Link>
            <Link className={styles.text} to="/hiring-management">
              Hiring Management
            </Link>
          </>
        ) : (
          <>
            <Link className={styles.text} to={`/personal-profile/${userID}`}>
              Personal Information
            </Link>
            <Link className={styles.text} to="/visa-status">
              Visa Status Management
            </Link>
          </>
        )}
        <span
          className={styles.text}
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          Logout
        </span>
      </div>
    </div>
  );
}