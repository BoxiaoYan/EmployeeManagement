import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HiringManagementPage from "./pages/HiringManagementPage";

import NotFound from "./pages/ErrorPages/NotFound";
import NotAuthorized from "./pages/ErrorPages/NotAuthorized"
import SessionExpired from "./pages/ErrorPages/SessionExpired";
import ServerError from "./pages/ErrorPages/ServerError";

import Registration from './pages/Registration';
import Login from './pages/Login';


function App() {

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HiringManagementPage />}>
          <Route path="/hiring-management" element={<HiringManagementPage />} />
        </Route>
        <Route path="/registration/:token" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />
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
