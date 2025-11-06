import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Table, Button, Modal, Form, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setError('');
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al cargar usuarios');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
      setError('No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (userId) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      setError('');
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccess('Usuario eliminado correctamente');
        fetchUsers();
      } else {
        throw new Error('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al eliminar el usuario');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: selectedUser.email,
          role: selectedUser.role
        })
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Usuario actualizado correctamente');
        setShowModal(false);
        fetchUsers();
      } else {
        throw new Error(result.error || 'Error al actualizar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <p>Cargando usuarios...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* ENCABEZADO MEJORADO */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1>Panel de Administración</h1>
              <p className="text-muted">Gestión completa de usuarios del sistema</p>
            </div>
            <Link to="/register">
              <Button variant="success" size="lg">
                + Crear Nuevo Usuario
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* ALERTS PARA MENSAJES */}
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      {success && <Alert variant="success" className="mb-3">{success}</Alert>}

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Usuarios Registrados ({users.length})</h4>
          <Button variant="outline-primary" size="sm" onClick={fetchUsers}>
            Actualizar
          </Button>
        </Card.Header>
        <Card.Body>
          {users.length === 0 ? (
            <div className="text-center py-4">
              <p>No hay usuarios registrados</p>
              <Link to="/register">
                <Button variant="primary">Crear primer usuario</Button>
              </Link>
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Fecha Creación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${
                        user.role === 'admin' ? 'bg-danger' : 
                        user.role === 'trainer' ? 'bg-warning' : 'bg-primary'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEdit(user)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Modal de Edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdate}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {selectedUser && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                  >
                    <option value="user">Usuario</option>
                    <option value="trainer">Entrenador</option>
                    <option value="admin">Administrador</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;