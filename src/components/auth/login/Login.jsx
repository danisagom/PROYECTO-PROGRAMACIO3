import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // evitar espacios 
    const cleanEmail = email.trim();

    // Busqueda en local storege
    const storedUser = localStorage.getItem(`user-${cleanEmail}`);
    if (storedUser) {
      const userObj = JSON.parse(storedUser);

      // se Valida contraseña
      if (userObj.password === password) {
        alert(`Bienvenido ${userObj.role}`);

        // se redirige segun rol
        if (userObj.role === "user") {
          navigate("/alumno/dashboard");
        } else if (userObj.role === "trainer") {
          navigate("/profesores/dashboard");
        } else if (userObj.role === "admin") {
          navigate("/administrativo/dashboard");
        } else {
          navigate("/dashboard"); // fallback
        }
      } else {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("Usuario no registrado");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "25rem", padding: "1.5rem" }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresá tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresá tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Ingresar
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p>
            ¿Todavía no tenés cuenta? <Link to="/register">Registrate</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
