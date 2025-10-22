import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Main from "./Main/Main.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import About from './Footer/About.jsx';

import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";
import Profile from "./Profile/Profile.jsx";
import NewRoutine from "./pages/newRoutine/NewRoutine.jsx";
import NotFound from "./components/ui/NotFound.jsx";
import Polity from "./Footer/Polity.jsx";

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
            <Route path="/new-routine" element={<NewRoutine onRoutineAdded={(r) => console.log(r)}/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/privacy" element={<Polity />} />

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
