import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    // Limpiar el token y datos del usuario
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");

    // Limpiar el contexto del usuario
    setUser(null);

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
