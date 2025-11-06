import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faDumbbell, faUser, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Header() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    alert("Sesión cerrada correctamente");
    navigate("/");
  };

  return (
    <div className="bg-dark text-white p-4 text-center">
      <h1>
        <Link to="/">
          <button
            style={{
              color: "white",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <FontAwesomeIcon icon={faHouse} className="me-2" />
          </button>
        </Link>
        <FontAwesomeIcon icon={faDumbbell} className="me-2" />
        Gimnasio Active Energy
      </h1>
      <p>
        Tu gimnasio Personal en casa, a tu ritmo, con nuestras rutinas personales
      </p>

      <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
        {!user?.isLoggedIn ? (
          <>
            <Link to="/login">
              <Button variant="primary" className="me-2">
                Iniciar Sesión
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="success">Registrarse</Button>
            </Link>
          </>
        ) : (
          <>
            {/* Ícono de perfil del usuario */}
            <Link to="/profile">
              <Button 
                variant="outline-light" 
                className="me-2"
                style={{ 
                  borderRadius: "50%", 
                  width: "45px", 
                  height: "45px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                title={`Perfil de ${user.email}`}
              >
                <FontAwesomeIcon icon={faUser} />
              </Button>
            </Link>

            {/* Información del usuario */}
            <span className="me-3 text-light">
              Bienvenido, <strong>{user.email}</strong>
            </span>

            {/* BOTONES ESPECÍFICOS PARA ENTRENADORES */}
            {(user.role === "trainer") && (
              <>
                <Link to="/profesores/dashboard">
                  <Button variant="info" className="me-2">
                    <FontAwesomeIcon icon={faTachometerAlt} className="me-1" />
                    Mi Panel
                  </Button>
                </Link>

                <Link to="/new-routine">
                  <Button variant="warning" className="me-2">
                    <FontAwesomeIcon icon={faDumbbell} className="me-1" />
                    Crear Rutina
                  </Button>
                </Link>
              </>
            )}

            {/* BOTÓN PARA ADMIN */}
            {(user.role === "admin") && (
              <Link to="/administrativo/dashboard">
                <Button variant="info" className="me-2">
                  <FontAwesomeIcon icon={faTachometerAlt} className="me-1" />
                  Panel Admin
                </Button>
              </Link>
            )}

            {/* BOTÓN PARA USUARIOS COMUNES */}
            {(user.role === "user") && (
              <Link to="/alumno/dashboard">
                <Button variant="info" className="me-2">
                  <FontAwesomeIcon icon={faTachometerAlt} className="me-1" />
                  Mi Panel
                </Button>
              </Link>
            )}

            {/* Botón de cerrar sesión */}
            <Button variant="danger" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;