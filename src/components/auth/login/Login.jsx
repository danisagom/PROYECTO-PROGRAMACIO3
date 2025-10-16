import React, { useState, useContext } from "react"; 
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import ValidationsLogin from "../validationsLogin";
const Login = () => {
  // Estados locales para el formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [errores, setErrores] = useState({}); // estado para errores
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 

  const handleLogin = (e) => {
    e.preventDefault();

    // evitar espacios (comentario original)
    const cleanEmail = email.trim();

   // Validaciones
    const validationErrors = ValidationsLogin({ email: cleanEmail, password });
    if (Object.keys(validationErrors).length > 0) {
    alert(Object.values(validationErrors).join("\n"));
    return;
  }



      setErrores({});




    // Busqueda en local storage 
    const storedUser = localStorage.getItem(`user-${cleanEmail}`);
    console.log("Intentando login para:", cleanEmail);

    if (storedUser) {
      const userObj = JSON.parse(storedUser);

      // Validacion
      if (userObj.password === password) {
        // Crea objeto actualizado con estado de login
        const updatedUser = {
          ...userObj,
          isLoggedIn: true,
          routines: [],
        };

        // Actualiza estado global y localStorage
        setUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        // se redirige segun rol 
        if (userObj.role === "user") {
          navigate("/alumno/dashboard");
        } else if (userObj.role === "trainer") {
          navigate("/profesores/dashboard");
        } else if (userObj.role === "admin") {
          navigate("/administrativo/dashboard");
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
            />{errores.password && <p style={{ color: "red" }}>{errores.password}</p>}

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
