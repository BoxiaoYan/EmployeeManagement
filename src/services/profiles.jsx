import apiCall from "./api";

export const fetchProfileSummary = async (setProfile, setDisplayProfile) => {
  const response = await apiCall({
    url: "/api/profile_summary",
    method: "GET",
  });
  setProfile(response.profileSummary);
  setDisplayProfile(response.profileSummary);
};
