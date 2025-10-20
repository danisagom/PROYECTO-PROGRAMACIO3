import React from 'react'
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";





const NewRoutine = ({ onRoutineAdded }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState("");
  const [nivel, setNivel] = useState("");
  const [ejercicios, setEjercicios] = useState("");
  const [img, setImg] = useState("");

  const navigate = useNavigate();

    const handleAddRoutine = async (event) => {
        event.preventDefault();

    const routineData = {
      nombre,
      descripcion,
      duracion: duracion ? parseInt(duracion, 10) : null,
      nivel,
      ejercicios,
      img
    };

    try {
      const res = await fetch("http://localhost:4000/routines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(routineData),
      });

    if (!res.ok) throw new Error("Error al agregar rutina");
      const data = await res.json();

    onRoutineAdded(data);

    setNombre("");
    setDescripcion("");
    setDuracion("");
    setNivel("");
    setEjercicios("");
    setImg("");


     alert(`Rutina "${data.nombre}" agregada con éxito`);
    } catch (error) {
      console.error(error);
      alert("Error al agregar rutina");
    }
  };

  return (
    <div>
        <Card className="m-4 w-75">
      <Card.Body>
        <Form onSubmit={handleAddRoutine}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre de la rutina"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="nivel">
                <Form.Label>Nivel</Form.Label>
                <Form.Select value={nivel} onChange={(e) => setNivel(e.target.value)} required>
                  <option value="">Seleccionar nivel</option>
                  <option value="principiante">Principiante</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="duracion">
                <Form.Label>Duración (min)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Duración en minutos"
                  value={duracion}
                  onChange={(e) => setDuracion(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="img">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre de imagen (ej: pecho.png)"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="ejercicios">
            <Form.Label>Ejercicios</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Lista de ejercicios"
              value={ejercicios}
              onChange={(e) => setEjercicios(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Agregar Rutina
          </Button>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Volver
          </Button>
        </Form>
      </Card.Body>
      
    </Card>
    </div>
  );
};

export default NewRoutine;