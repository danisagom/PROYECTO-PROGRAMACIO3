import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const TrainerDashboard = () => {
  const { user } = useContext(UserContext);
  const [myRoutines, setMyRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRoutines();
  }, []);

  const fetchMyRoutines = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/routines", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const allRoutines = await response.json();
        // Filtrar rutinas creadas por el entrenador (aquí asumimos que el trainer ve todas)
        setMyRoutines(allRoutines);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoutine = async (routineId) => {
    if (!confirm("¿Estás seguro de eliminar esta rutina?")) return;

    try {
      const token = localStorage.getItem("token");

      // LOGS TEMPORALES:
    console.log("=== 🚨 DEBUG FRONTEND 🚨 ===");
    console.log("🔐 Token desde localStorage:", token ? "✅ EXISTE" : "❌ NO EXISTE");
    console.log("🗑️ Rutina a eliminar ID:", routineId);

      const response = await fetch(
        `http://localhost:4000/routines/${routineId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Rutina eliminada correctamente");
        fetchMyRoutines();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading)
    return (
      <Container className="py-4">
        <p>Cargando tus rutinas...</p>
      </Container>
    );

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1>Panel de Entrenador</h1>
              <p className="text-muted">
                Hola {user?.email}, gestiona tus rutinas aquí
              </p>
            </div>
            <Link to="/new-routine">
              <Button variant="success" size="lg">
                + Crear Nueva Rutina
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>
              <h4 className="mb-0">
                Mis Rutinas Creadas ({myRoutines.length})
              </h4>
            </Card.Header>
            <Card.Body>
              {myRoutines.length === 0 ? (
                <div className="text-center py-4">
                  <p>No has creado rutinas todavía</p>
                  <Link to="/new-routine">
                    <Button variant="primary">Crear mi primera rutina</Button>
                  </Link>
                </div>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Nivel</th>
                      <th>Duración</th>
                      <th>Ejercicios</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myRoutines.map((routine) => (
                      <tr key={routine.id}>
                        <td>
                          <strong>{routine.nombre}</strong>
                          <br />
                          <small className="text-muted">
                            {routine.descripcion}
                          </small>
                        </td>
                        <td>
                          <Badge
                            bg={
                              routine.nivel === "principiante"
                                ? "success"
                                : routine.nivel === "intermedio"
                                ? "warning"
                                : "danger"
                            }
                          >
                            {routine.nivel}
                          </Badge>
                        </td>
                        <td>{routine.duracion} min</td>
                        <td>
                          <small>
                            {routine.ejercicios?.substring(0, 50)}...
                          </small>
                        </td>
                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteRoutine(routine.id)}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Estadísticas</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <h3>{myRoutines.length}</h3>
                <p className="text-muted">Rutinas Creadas</p>
              </div>
              <div className="mt-3">
                <small className="text-muted">
                  Puedes crear, editar y eliminar rutinas para los usuarios del
                  gimnasio.
                </small>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5 className="mb-0">Acciones Rápidas</h5>
            </Card.Header>
            <Card.Body>
              <Link to="/new-routine" className="d-block mb-2">
                <Button variant="primary" className="w-100">
                  Crear Rutina
                </Button>
              </Link>
              <Link to="/" className="d-block">
                <Button variant="outline-secondary" className="w-100">
                  Ver Rutinas Públicas
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TrainerDashboard;
