import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeProfileSummary from "./pages/EmployeeProfileSummary";
import NotFound from "./pages/NorFound";
import EmployeePersonalInformation from "./pages/EmployeePersonalInformation/EmployeePersonalInformation";


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
          <Route path="/employee-personal-information" element={<EmployeePersonalInformation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraBaseProvider>
  );
}

export default App;
