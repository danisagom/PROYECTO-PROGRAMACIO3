import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Solo borramos el estado de sesión, NO las credenciales registradas
    localStorage.removeItem("isLoggedIn");
    // Mantenemos userEmail y userPassword para futuras sesiones
    
    alert("Sesión cerrada correctamente");
    navigate("/"); // Redirigir a la página principal
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Cerrar Sesión
    </Button>
  );
};

export default Logout;
