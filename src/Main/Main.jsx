
import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Routines from '../components/routines/Routines';
import { Link } from 'react-router-dom';


function Main() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const handleAdquireRoutine = () => {
    if (!isLoggedIn) {
      alert("Por favor, inicia sesión para adquirir una rutina.");
    } else {
      alert("Rutina adquirida con éxito.");
    }
  };
  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Rutinas</h1>
      <Row>
        {Routines.map(rutina => (
          <Col key={rutina.id} md={4} className="mb-4">
            <Card>
              <Card.Body padding="100px">
                <Card.Img variant="top" src={rutina.img} />
                <Card.Title>{rutina.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{rutina.days}</Card.Subtitle>
                <Card.Text>{rutina.description}</Card.Text>
                <Card.Text>Precio: {rutina.price}</Card.Text>
                {isLoggedIn ? (
                  <Button variant="primary" onClick={handleAdquireRoutine} 
                  style={{ color: 'white' , backgroundColor: 'green' , borderColor: 'black'}}>
                    Adquirir Rutina</Button>
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
