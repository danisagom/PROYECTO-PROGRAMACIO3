import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faDumbbell } from "@fortawesome/free-solid-svg-icons"; 
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    alert("Sesión cerrada correctamente");
    navigate("/");
  };

  return (
    <div className="bg-dark text-white p-4 text-center">

      <h1><Link to="/"><button style={{color: 'white', backgroundColor: 'transparent', border: 'none' }}><FontAwesomeIcon icon={faHouse} className="me-2" /></button></Link>
      <FontAwesomeIcon icon={faDumbbell} className="me-2" />
      Gimnasio Active Energy</h1>
      <p>Tu gimnasio Personal en casa,a tu ritmo ,con nuestras rutinas personales</p>

      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <Button variant='primary' className="me-2">Iniciar Sesion</Button>
            </Link>
            
            <Link to="/register">
              <Button variant="success">Registrarse</Button>
            </Link>
          </>
        ) : (
          <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        )}
      </div>
    </div>
  )
}

export default Header;
