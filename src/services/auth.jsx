import apiCall from "./api";

export const register = async (data) => {
  return await apiCall({
    url: "/api/auth/register",
    method: "POST",
    data,
  });
};

export const signIn = async (data) => {
  return await apiCall({
    url: "/api/auth/login",
    method: "POST",
    data,
  });
};

export const verifyRegLink = async (token, setEmail, navigate) => {
  try {
    const response = await apiCall({
      url: `/api/auth/registration/${token}`,
      method: "GET",
    });
    setEmail(response.email);
  } catch (error) {
    // if email is empty, render <RegLinkExpired />
  }
};
