// import apiCall from "./api";

// export const fetchEmployeeByStatus = async (
//   status,
//   setEmployees,
//   setDisplayEmployees,
//   navigate
// ) => {
//   try {
//     const response = status
//       ? await apiCall({
//           url: `/api/employees_status/${status}`,
//           method: "GET",
//         })
//       : await apiCall({
//           url: "/api/employees_reg_status",
//           method: "GET",
//         });
//     const employees = response.employees.map((employee) => ({
//       key: employee.email,
//       ...employee,
//     }));
//     setEmployees(employees);
//     setDisplayEmployees(employees);
//   } catch (error) {
//     switch (error.message) {
//       case "Authentification Failed":
//         navigate("/error/not-authorized");
//         break;
//       default:
//         navigate("/error/server-error");
//         break;
//     }
//   }
// };

// export const sendRegistrationLink = async (data, setErrorMsg, reFetch) => {
//   try {
//     const response = await apiCall({
//       url: "/api/generate_registration_link",
//       method: "POST",
//       data,
//     });
//     console.log(response.regLink);
//     reFetch();
//   } catch (error) {
//     switch (error.message) {
//       case "User is already registered":
//         setErrorMsg("User is already registered");
//         break;
//       default:
//         setErrorMsg("Server Error");
//         break;
//     }
//   }
// };

import apiCall from "./api";

export const fetchVisaStatus = async (
  setIsOPT,
  setOptRecStatus,
  setEadStatus,
  setI983Status,
  setI20Status,
  setFeedback,
  navigate
) => {
  try {
    const response = await apiCall({
      url: `/api/visa_status`,
      method: "GET",
    });
    if (!response.visaStatus) {
      return setIsOPT(false);
    }
    setOptRecStatus(response.visaStatus.opt_receipt);
    setEadStatus(response.visaStatus.opt_ead);
    setI983Status(response.visaStatus.i983);
    setI20Status(response.visaStatus.i20);
    setFeedback(response.visaStatus.feedback);
  } catch (error) {
    console.log(error.message);
    switch (error.message) {
      case "Authentication failed":
        navigate("/error/not-authorized");
        break;
      case "Token Expired":
        navigate("/error/session-expired");
        break;
      default:
        navigate("/error/server-error");
        break;
    }
  }
};