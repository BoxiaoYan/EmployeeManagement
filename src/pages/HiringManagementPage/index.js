// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Tabs } from "antd";

// import TokenList from "./TokenList";
// import OnboardingApplicationReview from "./OnboardingApplicationReview";
// import styles from "./style.module.css";
// import { logOutUser } from "../../app/userSlice";

// // HiringManagementPage
// export default function HiringManagementPage() {
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("Registration Token");

//   const position = useSelector((state) => state.user.user.position);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const items = [
//     {
//       key: "Registration Token",
//       label: "Registration Token",
//       children: <TokenList search={search} setSearch={setSearch} />,
//     },
//     {
//       key: "Onboarding Application Review",
//       label: "Onboarding Application Review",
//       children: (
//         <OnboardingApplicationReview search={search} setSearch={setSearch} />
//       ),
//     },
//   ];

//   const handleSetTab = (key) => {
//     setStatus(key);
//     localStorage.setItem("hiringManagementTab1", key);
//   };
  
//   const handleLogout = () => {
//     dispatch(logOutUser());
//     navigate("/login");
//   }

//   useEffect(() => {
//     // Check Authentication
//     if (position !== "hr") {
//       navigate("/error/not-authorized");
//     }
//     // Load the search result from localStorage
//     const storedTab2 = localStorage.getItem("hiringManagementTab1");
//     if (storedTab2) {
//       setStatus(storedTab2);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <>
//       <button onClick={handleLogout}>Log out</button>
//       <Tabs
//         className={styles.tab}
//         activeKey={status}
//         defaultActiveKey="Registration Token"
//         items={items}
//         size="large"
//         onChange={handleSetTab}
//       />
//     </>
//   );
// }
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";

import TokenList from "./TokenList";
import OnboardingApplicationReview from "./OnboardingApplicationReview";
import styles from "./style.module.css";

// HiringManagementPage
export default function HiringManagementPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Registration Token");

  const position = useSelector((state) => state.user.user.position);
  const navigate = useNavigate();

  const items = [
    {
      key: "Registration Token",
      label: "Registration Token",
      children: <TokenList search={search} setSearch={setSearch} />,
    },
    {
      key: "Onboarding Application Review",
      label: "Onboarding Application Review",
      children: (
        <OnboardingApplicationReview search={search} setSearch={setSearch} />
      ),
    },
  ];

  useEffect(() => {
    // Check Authentication
    if (position !== "hr") {
      navigate("/error/not-authorized");
    }
    // Load the search result from localStorage
    const storedTab2 = localStorage.getItem("hiringManagementTab1");
    if (storedTab2) {
      setStatus(storedTab2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetTab = (key) => {
    setStatus(key);
    localStorage.setItem("hiringManagementTab1", key);
  };

  return (
    <>
      <Tabs
        className={styles.tab}
        activeKey={status}
        defaultActiveKey="Registration Token"
        items={items}
        size="large"
        onChange={handleSetTab}
      />
    </>
  );
}