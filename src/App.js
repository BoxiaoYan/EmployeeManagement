import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import VisaStatusManagement from './pages/VisaStatusManagement/VisaStatusManagement';


function App() {

  

  return (
    <BrowserRouter>
      <Routes>
            <Route path="/" element={(<>Welcome to the Home Page</>)} />
            <Route path="/registration/:token" element={<Registration/>} />
            <Route path="/signin" element={<Login/>} />
            <Route path="/vsm" element={<VisaStatusManagement/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
