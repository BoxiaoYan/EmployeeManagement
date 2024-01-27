// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// import styles from "./style.module.css";

// const Navbar = () => {
//   const position = useSelector((state) => state.user.user.position);

//   console.log("current position: " + position);
//   return (
//     <div className={styles.navbar}>
//       <div className="navbar-title">Employee Management</div>
//       {position === "employee" ? (
//         <>
//           <li>
//             <Link to="/personal-information">Personal Information</Link>
//           </li>
//           <li>
//             <Link to="/visa-status-management">Visa Status Management</Link>
//           </li>
//           <li>
//             <Link to="/logout">Logout</Link>
//           </li>
//         </>
//       ) : position === "hr" ? (
//         <>
//           <Link to="/">Home</Link>
//           <Link to="/employee-profiles">Employee Profiles</Link>
//           <Link to="/visa-status-management">Visa Status Management</Link>
//           <Link to="/hiring-management">Hiring Management</Link>
//           <Link to="/logout">Logout</Link>
//         </>
//       ) : null}
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logOutUser } from "../../app/userSlice";

import styles from "./style.module.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const position = useSelector((state) => state.user.user.position);

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <div className={styles.layout}>
      <div className={styles.title}>Employee Management</div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {position === "hr" ? (
          <>
            <Link className={styles.text} to="/employee-profile-summary">
              Employee Profiles
            </Link>
            <Link className={styles.text} to="/employee-visa-status">
              Visa Status Management
            </Link>
            <Link className={styles.text} to="/employee-hiring-status">
              Hiring Management
            </Link>
          </>
        ) : (
          <>
            <Link className={styles.text} to="/personal-profile">
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
