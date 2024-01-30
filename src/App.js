import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import EmployeeProfileSummary from "./pages/EmployeeProfileSummary";
import HrVisaStatusManagement from "./pages/HrVisaStatusManagement";
import HiringManagementPage from "./pages/HiringManagementPage";

import OnboardingApplication from "./pages/OnboardingApplication";
import VisaStatusManagement from "./pages/VisaStatusManagement";

import NotFound from "./pages/ErrorPages/NotFound";
import NotAuthorized from "./pages/ErrorPages/NotAuthorized";
import SessionExpired from "./pages/ErrorPages/SessionExpired";
import ServerError from "./pages/ErrorPages/ServerError";

import Registration from "./pages/Registration";
import Login from "./pages/Login";

import TestRedux from "./pages/Test/TestRedux";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Employee pages */}
          <Route
            path="/onboarding-application"
            element={<OnboardingApplication />}
          />
          <Route path="/personal-profile" element={<>personal application</>} />
          <Route path="/visa-status" element={<VisaStatusManagement />} />
          {/* Hr pages */}
          <Route
            path="/employee-profile-summary"
            element={<EmployeeProfileSummary />}
          />
          <Route path="/employee-profile" element={<>employee-profile</>} />
          <Route
            path="/employee-visa-status"
            element={<HrVisaStatusManagement />}
          />
          <Route
            path="/employee-hiring-status"
            element={<HiringManagementPage />}
          />
        </Route>
        <Route path="/registration/:token" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error">
          <Route path="/error/server-error" element={<ServerError />} />
          <Route path="/error/not-authorized" element={<NotAuthorized />} />
          <Route path="/error/session-expired" element={<SessionExpired />} />
        </Route>
        <Route path="/test" element={<TestRedux />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
