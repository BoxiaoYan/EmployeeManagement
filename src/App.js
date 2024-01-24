import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';


function App() {

  

  return (
    <BrowserRouter>
      <Routes>
            <Route path="/" element={(<>Welcome to the Home Page</>)} />
            <Route path="/registration/:token" element={<Registration/>} />
            <Route path="/signin" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
