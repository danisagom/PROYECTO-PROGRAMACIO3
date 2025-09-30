import { useState } from 'react'


import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';



import Dashboard from './components/dashboard/dashboard';
import Login from './components/auth/login/Login.jsx';
import Register from './components/auth/register/Register.jsx';
import Profile from './components/profile/Profile';
import Routines from './components/routines/Routines';
import NotFound from './components/ui/NotFound';


import { BrowserRouter, Routes, Route } from "react-router-dom";
 function App() {
  return (
    
      <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />

      
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/login" element={<Login />} />
            <Route path="Register" element={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/routines" element={<Routines />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
       
      <Footer />
    </div></BrowserRouter>
  );
}

export default App;
