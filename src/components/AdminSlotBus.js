import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Table } from "react-bootstrap";

const AdminSlotBus = () => {
  const [slotBuses, setSlotBuses] = useState([]);
  const [buses, setBus] = useState([]);
  const [routes, setRoute] = useState([]);
  const [slots, setSlot] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentSlotBus, setCurrentSlotBus] = useState({
    slot_id: "",
    bus_id: "",
    route_id: "",
  });
  const [isNewSlotBus, setIsNewSlotBus] = useState(true);
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Sử dụng Promise.all để gọi song song và tối ưu hiệu suất
      const [slotBusesData, slotsData, busesData, routesData] =
        await Promise.all([
          axios.get("http://localhost:3000/slot_bus"),
          axios.get("http://localhost:3000/slots"),
          axios.get("http://localhost:3000/buses"),
          axios.get("http://localhost:3000/routes"),
        ]);

      // Cập nhật state cho mỗi loại dữ liệu
      setSlotBuses(slotBusesData.data);
      setSlot(slotsData.data);
      setBus(busesData.data);
      setRoute(routesData.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const openModal = (
    slotBus = { slot_id: "", bus_id: "", route_id: "" },
    isNew = true
  ) => {
    setCurrentSlotBus(slotBus);
    setIsNewSlotBus(isNew);
    isNew ? setShowCreateModal(true) : setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowCreateModal(false);
  };

  const handleSave = async () => {
    if (isNewSlotBus) {
      await axios.post("http://localhost:3000/slot_bus", currentSlotBus);
    } else {
      await axios.put(
        `http://localhost:3000/slot_bus/${currentSlotBus.id}`,
        currentSlotBus
      );
    }
    fetchAllData();
    closeModal();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/slot_bus/${id}`);
    fetchAllData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numberValue = Number(value);
    setCurrentSlotBus((prevState) => ({ ...prevState, [name]: numberValue }));
  };

  return (
    <>
      <h1 className="text-center mt-3">Slot_Bus Information</h1>
      <Button variant="primary" onClick={() => openModal(undefined, true)}>
        Create Slot Bus
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Slot ID</th>
            <th>Bus ID</th>
            <th>Route ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slotBuses.map((slotBus) => {
            // Tìm thông tin chi tiết về slot, bus và route dựa trên ID
            const slot = slots.find((s) => s.id === slotBus.slot_id);
            const bus = buses.find((b) => b.id === slotBus.bus_id);
            const route = routes.find((r) => r.id === slotBus.route_id);

            return (
              <tr key={slotBus.id}>
                <td>{slotBus.id}</td>
                <td>
                  {slot
                    ? `${slot.week_day} - ${slot.period} | Time: ${slot.departure_time} -> ${slot.arrival_time}`
                    : "Not Found"}
                </td>
                <td>
                  {bus
                    ? `${bus.license_plate} - Capacity: ${bus.capacity}`
                    : "Not Found"}
                </td>
                <td>
                  {route
                    ? `${route.route_name} | ${route.start_location} -> ${route.end_location}`
                    : "Not Found"}
                </td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => openModal(slotBus, false)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(slotBus.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={showEditModal || showCreateModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isNewSlotBus ? "Create Slot Bus" : "Edit Slot Bus"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="slotId">
              <Form.Label>Slot</Form.Label>
              <Form.Control
                as="select"
                name="slot_id"
                value={currentSlotBus.slot_id}
                onChange={handleChange}
              >
                {slots.map((slot) => (
                  <option key={slot.id} value={slot.id}>
                    {`${slot.week_day} - ${slot.period} | Time: ${slot.departure_time} -> ${slot.arrival_time}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="busId">
              <Form.Label>Bus</Form.Label>
              <Form.Control
                as="select"
                name="bus_id"
                value={currentSlotBus.bus_id}
                onChange={handleChange}
              >
                {buses.map((bus) => (
                  <option key={bus.id} value={bus.id}>
                    {`${bus.license_plate} - Capacity: ${bus.capacity}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="routeId">
              <Form.Label>Route</Form.Label>
              <Form.Control
                as="select"
                name="route_id"
                value={currentSlotBus.route_id}
                onChange={handleChange}
              >
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {`${route.route_name} | ${route.start_location} -> ${route.end_location}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminSlotBus;
