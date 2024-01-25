import apiCall from "./api";

export const register = async (data) => {
  try {
    await apiCall({
      url: "/api/auth/register",
      method: "POST",
      data,
    });
    alert("You have successfully registered. Please log in.");
    data.navigate("/login");
  } catch (error) {
    switch (error.message) {
      case "User is already registered":
        alert("You have already registered. Please log in.");
        data.navigate("/login");
        break;
      case "Username is already existed":
        alert("Username is already existed.");
        break;
      default:
        data.navigate("/error/server-error");
        break;
    }
  }
};

export const signIn = async (data) => {
  return await apiCall({
    url: "/api/auth/signin",
    method: "POST",
    data,
  });
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
