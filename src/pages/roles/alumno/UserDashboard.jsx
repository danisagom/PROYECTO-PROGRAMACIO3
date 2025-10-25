import React, { useContext } from 'react'
import { UserContext } from '../../../context/UserContext';
import { Container } from 'react-bootstrap';

const UserDashboard = () => {
  const {user} = useContext(UserContext); 
  return (
    <Container className="text-center py-4">
      <p>Hola {user ? user.email : "Alumno"} pidele a tu entrenador que te agregue rutinas!</p>
    </Container>

  )
}

export default UserDashboard
