import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmployeeProfileSummary from "./pages/EmployeeProfileSummary";

import NotFound from "./pages/ErrorPages/NotFound";
import SessionExpired from "./pages/ErrorPages/SessionExpired";
import ServerError from "./pages/ErrorPages/ServerError";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeProfileSummary />} />
        <Route path="/error">
          <Route path="/error/server-error" element={<ServerError />} />
          <Route path="/error/session-expired" element={<SessionExpired />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
