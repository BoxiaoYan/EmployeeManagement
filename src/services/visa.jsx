// import apiCall from "./api";

// export const fetchVisaStatus = async (
//   setIsOPT,
//   setOptRecStatus,
//   setEadStatus,
//   setI983Status,
//   setI20Status,
//   setFeedback,
//   navigate
// ) => {
//   try {
//     setIsOPT("");
//     const response = await apiCall({
//       url: `/api/visa_status`,
//       method: "GET",
//     });
//     if (response.message) {
//       return setIsOPT(response.message);
//     }
//     setOptRecStatus(response.visaStatus.opt_receipt);
//     setEadStatus(response.visaStatus.opt_ead);
//     setI983Status(response.visaStatus.i983);
//     setI20Status(response.visaStatus.i20);
//     setFeedback(response.visaStatus.feedback);
//   } catch (error) {
//     console.log(error.message);
//     switch (error.message) {
//       case "Authentication failed":
//         navigate("/error/not-authorized");
//         break;
//       case "Token Expired":
//         navigate("/error/session-expired");
//         break;
//       default:
//         navigate("/error/server-error");
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
    setIsOPT("");
    const response = await apiCall({
      url: `/api/visa_status`,
      method: "GET",
    });
    if (response.message) {
      return setIsOPT(response.message);
    }
    setOptRecStatus(response.visaStatus.opt_receipt);
    setEadStatus(response.visaStatus.opt_ead);
    setI983Status(response.visaStatus.i983);
    setI20Status(response.visaStatus.i20);
    setFeedback(response.visaStatus.feedback);
  } catch (error) {
    console.log(error.message);
    switch (error.message) {
      case "Already approved":
        break;
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