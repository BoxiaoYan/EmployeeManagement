import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeProfileSummary from "./pages/EmployeeProfileSummary";
import NotFound from "./pages/NorFound";
import EmployeePersonalInformation from "./pages/PersonalInformation/PersonalInformation";
import HRPersonalInformation from "./pages/HRInformation/HRInformation";


import './scripts/App.css';
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
          <Route path="/" element={<EmployeeProfileSummary />} />
          <Route path="/personal-profile" element={<EmployeeInformation />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/HR-profile" element={<HRInformation />} />
        </Routes>
      </BrowserRouter>
    </ChakraBaseProvider>
  );
}

export default App;
