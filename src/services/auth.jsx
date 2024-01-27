import apiCall from "./api";

export const register = async (data) => {
  return await apiCall({
    url: "/api/auth/register",
    method: "POST",
    data,
  });
};

export const login = async (data) => {
  return await apiCall({
    url: "/api/auth/login",
    method: "POST",
    data,
  });
};

export const verifySession = async (navigate) => {
  try {
    const response = await apiCall({
      url: "/api/auth/verify_session",
      method: "POST",
    });
    if (response.token) {
      localStorage.setItem("token", response.token);
      navigate(
        response.position === "hr"
          ? "/hiring-management"
          : "/visa-status-management"
      );
    }
  } catch (error) {}
};

export const verifyRegLink = async (token, setEmail, setErrorMsg) => {
  try {
    const response = await apiCall({
      url: `/api/auth/registration/${token}`,
      method: "GET",
    });
    setEmail(response.email);
  } catch (error) {
    switch (error.message) {
      case "Token expired":
        setErrorMsg(
          "Your link has expired. Please contact HR to resend a link."
        );
        break;
      case "Invalid token":
        setErrorMsg("The registration link is invalid.");
        break;
      default:
        setErrorMsg("Server Error");
        break;
    }
  }
};
