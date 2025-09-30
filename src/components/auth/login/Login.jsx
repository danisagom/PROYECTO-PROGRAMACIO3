import React from "react";
import { useState } from "react";
import {Form, Button, Card} from "react-bootstrap"
import { Link, Navigate } from "react-router-dom"


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) =>{
    e.preventDefault();
    
    if(email === "test@test" && password === "1234"){
      alert("Logueado Correctamente");
      Navigate("/")
    } else{
      alert("Email o Contraseña incorrectos");
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
  )
}

export default Login;