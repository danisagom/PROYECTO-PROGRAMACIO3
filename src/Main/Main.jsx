import React, { useContext, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Routines from '../components/routines/Routines';
import { Link } from 'react-router-dom';
import { UserContext } from "../context/UserContext.jsx";

function Main() {
  const [users, setUsers] = useState([]); // inicializar como []

  const { user, login } = useContext(UserContext); // asumir que UserContext tiene user y login

  const handleAdquireRoutine = (rutina) => {
    if (!user?.isLoggedIn) {
      alert("Por favor, inicia sesión para adquirir una rutina.");
    } else {
      // Agregar la rutina al array de rutinas del usuario en el contexto
      login({
        ...user,
        routines: [...user.routines, rutina]
      });

      alert(`Rutina "${rutina.name}" adquirida con éxito.`);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Rutinas</h1>
      <Row>
        {Routines.map(rutina => (
          <Col key={rutina.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Img variant="top" src={rutina.img} />
                <Card.Title>{rutina.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{rutina.days}</Card.Subtitle>
                <Card.Text>{rutina.description}</Card.Text>
                <Card.Text>Precio: {rutina.price}</Card.Text>

                {user?.isLoggedIn ? (
                  <Button
                    variant="success"
                    onClick={() => handleAdquireRoutine(rutina)}
                    style={{ color: 'white', borderColor: 'black' }}
                  >
                    Adquirir Rutina
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button variant="secondary">Inicia sesión para adquirir</Button>
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
