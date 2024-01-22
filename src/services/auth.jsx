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
