import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeProfileSummary from "./pages/EmployeeProfileSummary";
import PersonalInformation from "./pages/PersonalInformation/PersonalInformation";
import HRInformation from "./pages/HRInformation/HRInformation";
import OnboardingApplication from "./pages/OnboardingApplication/OnboardingApplication";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import HiringManagementPage from "./pages/HiringManagementPage/index";
import ServerError from "./pages/ErrorPages/ServerError";
import NotAuthorized from "./pages/ErrorPages/NotAuthorized";
import SessionExpired from "./pages/ErrorPages/SessionExpired";
import NotFound from "./pages/ErrorPages/NotFound";
import ErrorBoundary from "./pages/ErrorPages/ErrorBoundary";


import './App.css';
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react';

const { CalendarIcon } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    CalendarIcon
  },
})

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={(<>Welcome to the Home Page</>)} />
          <Route path="/registration/:token" element={<Registration/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/signin" element={<Login/>} />

          <Route path="/hiring" element={<HiringManagementPage />} />
          <Route path="/error">
            <Route path="/error/server-error" element={<ServerError />} />
            <Route path="/error/not-authorized" element={<NotAuthorized />} />
            <Route path="/error/session-expired" element={<SessionExpired />} />
          </Route>

          <Route path="/summary" element={<EmployeeProfileSummary />} />
          <Route path="/onboarding-application" element={<OnboardingApplication />} />
          <Route path="/personal-profile" element={<PersonalInformation />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/HR-profile" element={<HRInformation />} />
        </Routes>
      </BrowserRouter>
    </ChakraBaseProvider>
  );
}

export default App;
