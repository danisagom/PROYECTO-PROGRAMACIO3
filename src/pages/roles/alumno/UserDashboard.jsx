import React, { useContext, useState, useEffect } from "react";
import { Card, Row, Col, Button, Container, Badge, Alert, Spinner } from "react-bootstrap";
import { UserContext } from "../../../context/UserContext.jsx";
import { CartContext } from "../../../context/CartContext.jsx";
import { FaShoppingCart } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      console.log("🔄 Cargando rutinas desde la API...");
      
      const response = await fetch("http://localhost:4000/routines/public");
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("✅ Rutinas cargadas:", data);
      
      setRoutines(data);
      setError("");
    } catch (error) {
      console.error("❌ Error:", error);
      setError("No se pudieron cargar las rutinas: " + error.message);
      setRoutines([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdquireRoutine = (rutina) => {
    addToCart(rutina);
    alert(`Rutina "${rutina.nombre}" agregada al carrito.`);
  };

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p>Cargando rutinas disponibles...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Container className="text-center py-4">
        <p>
          Hola {user ? user.email : "Alumno"} - ¡Explora nuestras rutinas disponibles!
        </p>
      </Container>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Bienvenido, {user?.email || "Alumno"}</h1>
        <div className="d-flex align-items-center">
          <FaShoppingCart size={28} />
          <Badge bg="warning" text="dark" className="ms-2" style={{ fontSize: '1rem' }}>
            {cart.length}
          </Badge>
        </div>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          <strong>Error:</strong> {error}
          <Button variant="outline-danger" size="sm" className="ms-2" onClick={fetchRoutines}>
            Reintentar
          </Button>
        </Alert>
      )}

      {/* Rutinas desde la API */}
      <div className="mb-5">
        <h3>Rutinas Disponibles ({routines.length})</h3>
        {routines.length === 0 && !error ? (
          <div className="text-center py-5">
            <p className="fs-5">No hay rutinas disponibles</p>
            <p className="text-muted">Pídele a tu entrenador que agregue rutinas</p>
          </div>
        ) : (
          <Row>
            {routines.map((rutina) => (
              <Col key={rutina.id} md={4} className="mb-4">
                <Card className="h-100">
                  {rutina.img && <Card.Img variant="top" src={rutina.img} />}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{rutina.nombre}</Card.Title>
                    <Card.Text className="flex-grow-1">
                      {rutina.descripcion || "Sin descripción"}
                    </Card.Text>
                    <div className="mt-auto">
                      <small className="text-muted d-block">
                        ⏱️ Duración: {rutina.duracion || "N/A"} min
                      </small>
                      <small className="text-muted d-block">
                        📊 Nivel: {rutina.nivel}
                      </small>
                      {rutina.ejercicios && (
                        <small className="text-muted d-block">
                          💪 Ejercicios: {rutina.ejercicios}
                        </small>
                      )}
                      <Button
                        variant="success"
                        className="w-100 mt-2"
                        onClick={() => handleAdquireRoutine(rutina)}
                      >
                        Agregar al Carrito
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Carrito */}
      <div className="mt-4">
        <h3>Mi Carrito ({cart.length})</h3>
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <p className="fs-5">El carrito está vacío 🛒</p>
            <p className="text-muted">Agrega rutinas desde la lista de disponibles</p>
          </div>
        ) : (
          <>
            <Row>
              {cart.map((rutina) => (
                <Col key={rutina.id} md={4} className="mb-4">
                  <Card className="h-100">
                    {rutina.img && <Card.Img variant="top" src={rutina.img} />}
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{rutina.nombre}</Card.Title>
                      <Card.Text className="flex-grow-1">
                        {rutina.descripcion || "Sin descripción"}
                      </Card.Text>
                      <div className="mt-auto">
                        <small className="text-muted">
                          Nivel: {rutina.nivel}
                        </small>
                        <Button
                          variant="danger"
                          size="sm"
                          className="w-100 mt-2"
                          onClick={() => removeFromCart(rutina.id)}
                        >
                          Quitar del Carrito
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="text-center mt-4 p-3 bg-light rounded">
              <h4>Total de rutinas en carrito: {cart.length}</h4>
              <Button variant="success" className="me-2">
                Finalizar Compra
              </Button>
              <Button variant="outline-danger" onClick={clearCart}>
                Vaciar Carrito
              </Button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default UserDashboard;