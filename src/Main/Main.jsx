
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Routines from '../components/routines/Routines';

function Main() {
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Main;
