import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faDumbbell } from "@fortawesome/free-solid-svg-icons"; 
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="bg-dark text-white p-4 text-center">
      
      <h1><FontAwesomeIcon icon={faHouse} className="me-2" />
       <FontAwesomeIcon icon={faDumbbell} className="me-2" />
      Gimnasio Active Energy</h1>
      <p>Tu gimnasio Personal en casa,a tu ritmo ,con nuestras rutinas personales</p>

      {/*botones para el inicio se sesion y registro */}
      <div>
        <Link to="/Login">
        <Button variant='primary'>Iniciar Sesion</Button>
        </Link>
        
        <Link to="/Register">
          <Button variant="success">Registrarse</Button>
        </Link>
      </div>
    </div>
  )
}

export default Header;
