import React, { useState } from 'react';
import { Button, Card, Col, Form, Row, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NewRoutine = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    duracion: "",
    nivel: "",
    ejercicios: "",
    img: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = function(e) {
    const { name, value } = e.target;
    setFormData(function(prev) {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleAddRoutine = async function(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No hay token de autenticación");
        setLoading(false);
        return;
      }

      // Datos básicos para prueba
      const routineData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        duracion: formData.duracion ? parseInt(formData.duracion) : null,
        nivel: formData.nivel,
        ejercicios: formData.ejercicios,
        img: formData.img
      };

      console.log("Enviando al servidor:", routineData);

      const res = await fetch("http://localhost:4000/routines", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(routineData)
      });

      const responseData = await res.json();
      
      if (!res.ok) {
        throw new Error(responseData.error || "Error al crear rutina");
      }

      setSuccess("Rutina creada exitosamente: " + responseData.nombre);
      
      // Limpiar formulario
      setFormData({
        nombre: "",
        descripcion: "",
        duracion: "",
        nivel: "",
        ejercicios: "",
        img: ""
      });

      setTimeout(function() {
        navigate("/profesores/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Error:", error);
      setError("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="m-4 w-75">
        <Card.Body>
          <h2 className="text-center mb-4">Crear Nueva Rutina</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleAddRoutine}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>Nombre *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Nombre de la rutina"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="nivel">
                  <Form.Label>Nivel *</Form.Label>
                  <Form.Select 
                    name="nivel" 
                    value={formData.nivel} 
                    onChange={handleChange} 
                    required
                    disabled={loading}
                  >
                    <option value="">Seleccionar nivel</option>
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="ejercicios">
              <Form.Label>Ejercicios *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="ejercicios"
                placeholder="Ejercicios: Flexiones, Sentadillas, Abdominales..."
                value={formData.ejercicios}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="descripcion"
                placeholder="Descripción de la rutina..."
                value={formData.descripcion}
                onChange={handleChange}
                disabled={loading}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="duracion">
                  <Form.Label>Duración (minutos)</Form.Label>
                  <Form.Control
                    type="number"
                    name="duracion"
                    placeholder="30"
                    value={formData.duracion}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="img">
                  <Form.Label>Imagen (URL)</Form.Label>
                  <Form.Control
                    type="text"
                    name="img"
                    placeholder="http://ejemplo.com/imagen.jpg"
                    value={formData.img}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Creando...
                  </>
                ) : (
                  "Crear Rutina"
                )}
              </Button>
              <Button 
                variant="secondary" 
                onClick={function() { navigate("/trainer/dashboard"); }}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewRoutine;
