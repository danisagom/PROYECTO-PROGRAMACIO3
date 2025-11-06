import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ValidationsLogin from "../validationsLogin.jsx";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Llama a la función de validación pasando confirmPassword
    const validationErrors = ValidationsLogin({ email, password, confirmPassword });
    if (Object.keys(validationErrors).length > 0) {
      setErrores(validationErrors); 
      return;
    }

    setErrores({}); // limpia errores

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, 
          password, 
          role: "user" // ← SIEMPRE se registra como "user"
        }),
      });

      if (response.ok) {
        alert('Registro exitoso. Ahora podés iniciar sesión');
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión al servidor");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "25rem", padding: "1.5rem" }}>
        <h3 className="text-center mb-4">Registrarse</h3>
        <Form onSubmit={handleRegister}>
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
            {errores.email && <p style={{ color: "red" }}>{errores.email}</p>}
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
            {errores.password && <p style={{ color: "red" }}>{errores.password}</p>}
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repetí tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              required
            />
            {errores.confirmPassword && <p style={{ color: "red" }}>{errores.confirmPassword}</p>}
          </Form.Group>

          {/* QUITADO el selector de roles */}

          <Button variant="success" type="submit" className="w-100">
            Registrarse como Usuario
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p>
            ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;