import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

function Main() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, login } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/routines/public")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const routinesArray = Array.isArray(data) ? data : [];
        setRoutines(routinesArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudieron cargar las rutinas");
        setRoutines([]);
        setLoading(false);
      });
  }, []);

  const handleAdquireRoutine = (rutina) => {
    if (!user?.isLoggedIn) {
      alert("Por favor, inicia sesión para adquirir una rutina.");
    } else {
      login({
        ...user,
        routines: [...user.routines, rutina],
      });
      alert(`Rutina "${rutina.nombre}" adquirida con éxito.`);
    }
  };
  const handleDeleteRoutine = async (id) => {
    if (!confirm("¿Seguro que querés eliminar esta rutina?")) return;

    try {
      const res = await fetch(`http://localhost:4000/routines/${id}`, {
        method: "DELETE",
      });

      if (res.status === 204) {
        // Si se eliminó correctamente, actualizamos el estado en el front
        setRoutines((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert("No se pudo eliminar la rutina");
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la rutina");
    }
  };

  if (loading) return <p>Cargando rutinas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Rutinas</h1>
      <Row>
        {Array.isArray(routines) &&
          routines.map((r) => (
            <Col key={r.id} md={4} className="mb-4">
              <Card>
                {r.img && <Card.Img variant="top" src={r.img} />}
                <Card.Body>
                  <Card.Title>{r.nombre}</Card.Title>
                  <Card.Text>{r.descripcion}</Card.Text>
                  <small>
                    Duración: {r.duracion} min - Nivel: {r.nivel}
                  </small>
                  <p>Ejercicios: {r.ejercicios}</p>

                  {user?.isLoggedIn ? (
                    <Button
                      variant="success"
                      onClick={() => handleAdquireRoutine(r)}
                    >
                      Adquirir Rutina
                    </Button>
                  ) : (
                    <Link to="/login">
                      <Button variant="secondary">
                        Inicia sesión para adquirir
                      </Button>
                    </Link>
                  )}
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
}
  
export default Main;
