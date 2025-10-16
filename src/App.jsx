import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Main from "./Main/Main.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";


import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Routines from "./pages/routines/Routines.jsx";
import NotFound from "./components/ui/NotFound.jsx";

import UserDashboard from "./pages/roles/alumno/UserDashboard.jsx";
import TrainerDashboard from "./pages/roles/Profesores/TrainerDashboard.jsx";
import AdminDashboard from "./pages/roles/Administrativo/AdminDashboard.jsx";


import { UserProvider } from "./context/UserContext.jsx";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Header />
       
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/routines" element={<Routines />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />

            {/* Dashboards según rol */}
           <Route path="/alumno/dashboard" element={<UserDashboard />} />
           <Route path="/profesores/dashboard" element={<TrainerDashboard />} />
           <Route path="/administrativo/dashboard" element={<AdminDashboard />} />
          </Routes>
        

          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
