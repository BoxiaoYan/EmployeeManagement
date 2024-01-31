import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import EmployeeProfileSummary from "./pages/EmployeeProfileSummary";
import HRInformation from "./pages/HRInformation/HRInformation";
import HrVisaStatusManagement from "./pages/HrVisaStatusManagement";
import HiringManagementPage from "./pages/HiringManagementPage";

import OnboardingApplication from "./pages/OnboardingApplication/OnboardingApplication";
import PersonalInformation from "./pages/PersonalInformation/PersonalInformation";
import VisaStatusManagement from "./pages/VisaStatusManagement";

import NotFound from "./pages/ErrorPages/NotFound";
import NotAuthorized from "./pages/ErrorPages/NotAuthorized";
import SessionExpired from "./pages/ErrorPages/SessionExpired";
import ServerError from "./pages/ErrorPages/ServerError";

import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {/* Employee pages */}
          <Route
            path="/onboarding-application/:employee_id"
            element={<OnboardingApplication />}
          />
          <Route
            path="/personal-profile/:employee_id"
            element={<PersonalInformation />}
          />
          <Route path="/visa-status" element={<VisaStatusManagement />} />
          {/* Hr pages */}
          <Route path="/hr-profile" element={<HRInformation />} />
          <Route
            path="/employee-visa-status"
            element={<HrVisaStatusManagement />}
          />
          <Route path="/hiring-management" element={<HiringManagementPage />} />
        </Route>
        <Route path="/registration/:token" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error">
          <Route path="/error/server-error" element={<ServerError />} />
          <Route path="/error/not-authorized" element={<NotAuthorized />} />
          <Route path="/error/session-expired" element={<SessionExpired />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
