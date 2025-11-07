import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRoutines();
    }
  }, [user]);

  const fetchRoutines = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/routines', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRoutines(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-4">
        <p>Cargando...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <div className="bg-primary text-white rounded-circle p-3 me-3">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </div>
            <div>
              <h3 className="mb-1">{user.email}</h3>
              <small className="text-muted">Miembro del gimnasio</small>
            </div>
          </div>
        </Card.Body>
      </Card>

      
    </Container>
  );
};

export default Profile;