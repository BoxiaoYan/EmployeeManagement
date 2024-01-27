import apiCall from "./api";

export const fetchVisaStatus = async (
  userID,
  setOptRecStatus,
  setEadStatus,
  setI983Status,
  setI20Status,
//   navigate
) => {
  try {
    const response = await apiCall({
      url: `/api/user_visa_status/${userID}`,
      method: "GET",
    });
    setOptRecStatus(response.visaStatus.opt_receipt);
    setEadStatus(response.visaStatus.opt_ead);
    setI983Status(response.visaStatus.i983);
    setI20Status(response.visaStatus.i20);
  } catch (error) {
    console.log(error.message)
    // switch (error.message) {
    //   case "Authentification Failed":
    //     navigate("/error/not-authorized");
    //     break;
    //   case "Token Expired":
    //     navigate("/error/session-expired");
    //     break;
    //   default:
    //     navigate("/error/server-error");
    //     break;
    // }
  }
};


// Approve a document
export const approveDocument = async (documentId) => {

  return new Promise((resolve, reject) => {

  });
};

// Reject a document with feedback
export const rejectDocument = async (documentId, feedback) => {

  return new Promise((resolve, reject) => {

  });
};

// Send a notification to an employee
export const sendNotification = async (userId) => {

  return new Promise((resolve, reject) => {

  });
};

