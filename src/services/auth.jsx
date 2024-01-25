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
    url: "/api/auth/signin",
    method: "POST",
    data,
  });
};
export const verifyRegLink = async (token, setEmail) => {
  try {
    const response = await apiCall({
      url: `/api/auth/registration/${token}`,
      method: "GET",
    });
    // console.log('API Response:', response);
    setEmail(response.email);
  } catch (error) {
    // if email is empty, render <RegLinkExpired />
  }
};