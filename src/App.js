import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmployeeProfileSummary from "./pages/EmployeeProfileSummary";

import NotFound from "./pages/NorFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeProfileSummary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
