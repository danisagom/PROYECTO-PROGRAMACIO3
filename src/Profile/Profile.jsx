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

      <Card>
        <Card.Header>
          <h4>
            <FontAwesomeIcon icon={faDumbbell} className="me-2" />
            Mis Rutinas ({routines.length})
          </h4>
        </Card.Header>
        <Card.Body>
          {routines.length === 0 ? (
            <div className="text-center py-4">
              <p>No tienes rutinas todavía</p>
              <Button variant="primary" href="/new-routine">
                Crear mi primera rutina
              </Button>
            </div>
          ) : (
            <div className="row">
              {routines.map(routine => (
                <div key={routine.id} className="col-md-6 mb-3">
                  <Card>
                    <Card.Body>
                      <h5>{routine.name}</h5>
                      <p className="text-muted">{routine.description}</p>
                      <Button variant="outline-primary" size="sm">
                        Ver rutina
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;