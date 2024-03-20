import { Button, Table, Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminRoute() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoute, setNewRoute] = useState({
    route_name: "",
    start_location: "",
    end_location: "",
  });

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/routes");
      setRoutes(response.data);
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    }
  };

  const handleEdit = (route) => {
    setSelectedRoute(route);
    handleShowEditModal();
  };

  const handleSaveChanges = async () => {
    if (!selectedRoute.route_name || !selectedRoute.start_location || !selectedRoute.end_location) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/routes/${selectedRoute.id}`, selectedRoute);
      handleCloseEditModal();
      fetchRoutes(); 
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  const handleDelete = async (routeId) => {
    try {
      await axios.delete(`http://localhost:3000/routes/${routeId}`);
      fetchRoutes(); 
    } catch (error) {
      console.error("Failed to delete route:", error);
    }
  };

  const handleCreateNewRoute = async () => {
  
    if (!newRoute.route_name || !newRoute.start_location || !newRoute.end_location) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/routes", newRoute);
      handleCloseCreateModal();
      setNewRoute({ route_name: "", start_location: "", end_location: "" });
      fetchRoutes(); 
    } catch (error) {
      console.error("Failed to create new route:", error);
    }
  };

  return (
    <>
      <h1 className="text-center mt-3">Route Information</h1>
      <Button variant="primary" className="mb-3" onClick={handleShowCreateModal}>
        Create new route
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Route Name</th>
            <th>Start Location</th>
            <th>End Location</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.id}>
              <td>{route.id}</td>
              <td>{route.route_name}</td>
              <td>{route.start_location}</td>
              <td>{route.end_location}</td>
              <td>
                <Button variant="primary" className="m-2" onClick={() => handleEdit(route)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(route.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRouteName">
              <Form.Label>Route Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedRoute ? selectedRoute.route_name : ""}
                onChange={(e) => setSelectedRoute({...selectedRoute, route_name: e.target.value})}
              />
            </Form.Group>
            <Form.Group controlId="formStartLocation">
              <Form.Label>Start Location</Form.Label>
              <Form.Control
                type="text"
                value={selectedRoute ? selectedRoute.start_location : ""}
                onChange={(e) => setSelectedRoute({...selectedRoute, start_location: e.target.value})}
              />
            </Form.Group>
            <Form.Group controlId="formEndLocation">
              <Form.Label>End Location</Form.Label>
              <Form.Control
                type="text"
                value={selectedRoute ? selectedRoute.end_location : ""}
                onChange={(e) => setSelectedRoute({...selectedRoute, end_location: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewRouteName">
              <Form.Label>Route Name</Form.Label>
              <Form.Control
                type="text"
                value={newRoute.route_name}
                onChange={(e) => setNewRoute({...newRoute, route_name: e.target.value})}
              />
            </Form.Group>
            <Form.Group controlId="formNewStartLocation">
              <Form.Label>Start Location</Form.Label>
              <Form.Control
                type="text"
                value={newRoute.start_location}
                onChange={(e) => setNewRoute({...newRoute, start_location: e.target.value})}
              />
            </Form.Group>
            <Form.Group controlId="formNewEndLocation">
              <Form.Label>End Location</Form.Label>
              <Form.Control
                type="text"
                value={newRoute.end_location}
                onChange={(e) => setNewRoute({...newRoute, end_location: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateNewRoute}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminRoute;
