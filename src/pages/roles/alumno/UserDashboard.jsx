import React, { useContext } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import Routines from "../../routines/Routines";
import { UserContext } from "../../../context/UserContext.jsx";
import { CartContext } from "../../../context/CartContext.jsx";
import { FaShoppingCart } from "react-icons/fa";
import { Container } from "react-bootstrap";

const UserDashboard = () => {
  const { user } = useContext(UserContext);

  const handleAdquireRoutine = (rutina) => {
    addToCart(rutina);
    alert(`Rutina "${rutina.name}" agregada al carrito.`);
  };

  const total = cart.reduce((sum, rutina) => sum + rutina.price, 0);

  return (
    <div className="container mt-4">
      <Container className="text-center py-4">
        <p>
          Hola {user ? user.email : "Alumno"} pidele a tu entrenador que te
          agregue rutinas!
        </p>
      </Container>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Bienvenido, {user?.name || "Alumno"}</h1>
        <div className="d-flex align-items-center">
          <FaShoppingCart size={28} />
          <span
            className="badge bg-warning text-dark"
            style={{ marginLeft: "2px" }}
          >
            {cart.length}
          </span>
        </div>
      </div>

      <Row>
        {Routines.map((rutina) => (
          <Col key={rutina.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={rutina.img} />
              <Card.Body>
                <Card.Title>{rutina.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {rutina.days}
                </Card.Subtitle>
                <Card.Text>{rutina.description}</Card.Text>
                <Card.Text>Precio: ${rutina.price}</Card.Text>
                <Button
                  variant="success"
                  onClick={() => handleAdquireRoutine(rutina)}
                  style={{ color: "white", borderColor: "black" }}
                >
                  Adquirir Rutina
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Vista del carrito */}
      <div className="mt-4">
        <h3>
          Carrito de {user?.name || "Alumno"} ({cart.length})
        </h3>
        {cart.length === 0 ? (
          <p>El carrito está vacío 🛒</p>
        ) : (
          <>
            <Row>
              {cart.map((rutina) => (
                <Col key={rutina.id} md={4} className="mb-4">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={rutina.img}
                      alt={rutina.name}
                    />
                    <Card.Body>
                      <Card.Title>{rutina.name}</Card.Title>
                      <Card.Text>{rutina.description}</Card.Text>
                      <Card.Text>Precio: ${rutina.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="text-center mt-4">
              <h4>Total: ${total}</h4>
              <Button variant="danger" onClick={clearCart} className="mt-2">
                Vaciar carrito
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default UserDashboard;
