import React from 'react'
import { useState } from 'react'
import { Button, Form, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'


const Register = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const navigate = useNavigate();
 const handleRegister = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("las contraseñas no son iguales");
      return;
    }
// por ahora guardamos en localstorage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    alert("Registro exitoso  Ahora podés iniciar sesión");
    navigate("/login"); // despues de registrarnos nos manda al login 
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
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresá tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repetí tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Registrarse
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p>
            ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Register