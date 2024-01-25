import apiCall from "./api";

export const fetchEmployeeByStatus = async (
  status,
  setEmployees,
  setDisplayEmployees,
  navigate
) => {
  try {
    const response = status
      ? await apiCall({
          url: `/api/employees_status/${status}`,
          method: "GET",
        })
      : await apiCall({
          url: "/api/employees_reg_status",
          method: "GET",
        });
    const employees = response.employees.map((employee, index) => ({
      ...employee,
      key: index,
    }));
    setEmployees(employees);
    setDisplayEmployees(employees);
  } catch (error) {
    switch (error.message) {
      case "Authentification Failed":
        navigate("/error/not-authorized");
        break;
      default:
        navigate("/error/server-error");
        break;
    }
  }
};

export const sendRegistrationLink = async (data, setErrorMsg, reFetch) => {
  try {
    const response = await apiCall({
      url: "/api/generate_registration_link",
      method: "POST",
      data,
    });
    console.log(response.regLink);
    reFetch();
  } catch (error) {
    switch (error.message) {
      case "User is already registered":
        setErrorMsg("User is already registered");
        break;
      default:
        setErrorMsg("Server Error");
        break;
    }
  }
};
