import apiCall from "./api";

export const fetchEmployeeByStatus = async (status, setEmployees, navigate) => {
  try {
    const response = await apiCall({
      url: `/api/employees_status/${status}`,
      method: "GET",
    });
    setEmployees(response.emploees);
  } catch (error) {
    console.log(error)
    // switch (error.message) {
    //   case "Authentification Failed":
    //     navigate("/error/not-authorized");
    //     break;
    //   default:
    //     navigate("/error/server-error");
    //     break;
    // }
  }
};
