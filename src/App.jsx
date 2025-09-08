import { useState } from 'react'
import './App.css'
import Dashboard from './components/dashboard/dashboard';
import Login from './components/auth/login';
import Profile from './components/profile/Profile';
import Routines from './components/routines/Routines';
import NotFound from './components/ui/NotFound';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} /> // lleva a NotFound si no coincide con ninguna ruta
      </Routes>
    </BrowserRouter>
  );
}

export default App;
