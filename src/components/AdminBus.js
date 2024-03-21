import { Button, Table, Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminBus() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBus, setNewBus] = useState({
    license_plate: "",
    capacity: "",
  });

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/buses");
      setBuses(response.data);
    } catch (error) {
      console.error("Failed to fetch buses:", error);
    }
  };

  const handleEdit = (bus) => {
    setSelectedBus(bus);
    handleShowEditModal();
  };

  const handleSaveChanges = async () => {
    // Kiểm tra các trường không được rỗng
    if (!selectedBus.license_plate || !selectedBus.capacity) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/buses/${selectedBus.id}`, selectedBus);
      handleCloseEditModal();
      fetchBuses(); // Refresh buses after save
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  const handleDelete = async (busId) => {
    try {
      await axios.delete(`http://localhost:3000/buses/${busId}`);
      fetchBuses(); // Refresh buses after delete
    } catch (error) {
      console.error("Failed to delete bus:", error);
    }
  };

  const handleCreateNewBus = async () => {
    // Kiểm tra các trường không được rỗng
    if (!newBus.license_plate || !newBus.capacity) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/buses", newBus);
      handleCloseCreateModal();
      fetchBuses(); // Refresh buses after create
    } catch (error) {
      console.error("Failed to create new bus:", error);
    }
  };

  return (
    <>
      <h1 className="text-center mt-3">Bus Information</h1>
      <Button variant="primary" className="mb-3" onClick={handleShowCreateModal}>
        Create new bus
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>License Plate</th>
            <th>Capacity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.id}</td>
              <td>{bus.license_plate}</td>
              <td>{bus.capacity}</td>
              <td>
                <Button variant="primary" className="m-2" onClick={() => handleEdit(bus)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(bus.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Bus Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLicensePlate">
              <Form.Label>License Plate</Form.Label>
              <Form.Control
                type="text"
                value={selectedBus ? selectedBus.license_plate : ""}
                onChange={(e) => setSelectedBus({...selectedBus, license_plate: e.target.value})}
              />
            </Form.Group>
            <Form.Group controlId="formCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="text"
                value={selectedBus ? selectedBus.capacity : ""}
                onChange={(e) => setSelectedBus({...selectedBus, capacity: e.target.value})}
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

      {/* Create New Bus Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Bus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewLicensePlate">
              <Form.Label>License Plate</Form.Label>
              <Form.Control
                type="text"
                value={newBus.license_plate}
                onChange={(e) => setNewBus({...newBus, license_plate: e.target.value})}
              />
            </Form.Group>
            <Form.Group controlId="formNewCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="text"
                value={newBus.capacity}
                onChange={(e) => setNewBus({...newBus, capacity: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateNewBus}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminBus;
