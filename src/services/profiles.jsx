import apiCall from "./api";

export const fetchProfileSummary = async (
  setProfile,
  setDisplayProfile,
  navigate
) => {
  try {
    const response = await apiCall({
      url: "/api/profile_summary",
      method: "GET",
    });
    setProfile(response.profileSummary);
    setDisplayProfile(response.profileSummary);
  } catch (error) {
    switch (error.message) {
      case "Authentification Failed":
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