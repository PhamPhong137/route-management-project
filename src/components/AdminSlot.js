import { Button, Table, Modal, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminSlot() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    week_day: "",
    period: "",
    departure_time: "",
    arrival_time: "",
  });

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get("http://localhost:3000/slots");
      setSlots(response.data);
    } catch (error) {
      console.error("Failed to fetch slots:", error);
    }
  };

  const handleEdit = (slot) => {
    setSelectedSlot(slot);
    handleShowEditModal();
  };

  const handleSaveChanges = async () => {
    
    if (
      !selectedSlot.week_day ||
      !selectedSlot.period ||
      !selectedSlot.departure_time ||
      !selectedSlot.arrival_time
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/slots/${selectedSlot.id}`,
        selectedSlot
      );
      handleCloseEditModal();
      fetchSlots(); // Refresh slots after save
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  const handleDelete = async (slotId) => {
    try {
      await axios.delete(`http://localhost:3000/slots/${slotId}`);
      fetchSlots(); // Refresh slots after delete
    } catch (error) {
      console.error("Failed to delete slot:", error);
    }
  };

  const handleCreateNewSlot = async () => {
    
    if (
      !newSlot.week_day ||
      !newSlot.period ||
      !newSlot.departure_time ||
      !newSlot.arrival_time
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/slots", newSlot);
      handleCloseCreateModal();
      fetchSlots(); // Refresh slots after create
    } catch (error) {
      console.error("Failed to create new slot:", error);
    }
  };

  return (
    <>
      <h1 className="text-center mt-3">Slot Information</h1>
      <Button
        variant="primary"
        className="mb-3"
        onClick={handleShowCreateModal}
      >
        Create new slot
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Week Day</th>
            <th>Period</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot.id}>
              <td>{slot.id}</td>
              <td>{slot.week_day}</td>
              <td>{slot.period}</td>
              <td>{slot.departure_time}</td>
              <td>{slot.arrival_time}</td>
              <td>
                <Button
                  variant="primary"
                  className="m-2"
                  onClick={() => handleEdit(slot)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(slot.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Slot Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditWeekDay">
              <Form.Label>Week Day</Form.Label>
              <Form.Control
                as="select"
                value={selectedSlot ? selectedSlot.week_day : ""}
                onChange={(e) =>
                  setSelectedSlot({ ...selectedSlot, week_day: e.target.value })
                }
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formEditPeriod">
              <Form.Label>Period</Form.Label>
              <Form.Control
                as="select"
                value={selectedSlot ? selectedSlot.period : ""}
                onChange={(e) =>
                  setSelectedSlot({ ...selectedSlot, period: e.target.value })
                }
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formEditDepartureTime">
              <Form.Label>Departure Time</Form.Label>
              <Form.Control
                type="select"
                value={selectedSlot ? selectedSlot.departure_time : ""}
                onChange={(e) =>
                  setSelectedSlot({
                    ...selectedSlot,
                    departure_time: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEditArrivalTime">
              <Form.Label>Arrival Time</Form.Label>
              <Form.Control
                type="text"
                value={selectedSlot ? selectedSlot.arrival_time : ""}
                onChange={(e) =>
                  setSelectedSlot({
                    ...selectedSlot,
                    arrival_time: e.target.value,
                  })
                }
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

      {/* Create New Slot Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewWeekDay">
              <Form.Label>Week Day</Form.Label>
              <Form.Control
                as="select"
                value={newSlot.week_day}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, week_day: e.target.value })
                }
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNewPeriod">
              <Form.Label>Period</Form.Label>
              <Form.Control
                as="select"
                value={newSlot.period}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, period: e.target.value })
                }
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNewDepartureTime">
              <Form.Label>Departure Time</Form.Label>
              <Form.Control
                as="select"
                value={newSlot.departure_time}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, departure_time: e.target.value })
                }
              >
                <option value="7:00">7:00</option>
                <option value="9:30">9:30</option>
                <option value="13:00">13:00</option>
                <option value="14:30">14:30</option>
                <option value="16:00">16:00</option>
                <option value="17:40">17:40</option>

               
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formNewArrivalTime">
              <Form.Label>Arrival Time</Form.Label>
              <Form.Control
                type="text"
                value={newSlot.arrival_time}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, arrival_time: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateNewSlot}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminSlot;
