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
    const employees = response.employees.map((employee) => ({
      key: employee.email,
      ...employee,
    }));
    setEmployees(employees);
    setDisplayEmployees(employees);
  } catch (error) {
    switch (error.message) {
      case "Authentication failed":
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

export const sendRegistrationLink = async (
  data,
  message,
  navigate,
  reFetch
) => {
  try {
    await apiCall({
      url: "/api/generate_registration_link",
      method: "POST",
      data,
    });
    message.success("Registration token is sent");
    reFetch();
  } catch (error) {
    switch (error.message) {
      case "Authentication failed":
        navigate("/error/not-authorized");
        break;
      case "Token Expired":
        navigate("/error/session-expired");
        break;
      case "User is already registered":
        message.error("User is already registered");
        break;
      default:
        message.error("Server Error");
        break;
    }
  }
};
