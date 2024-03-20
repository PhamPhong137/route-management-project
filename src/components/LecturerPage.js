import React, { useState, useEffect } from "react";
import { Table, Button, Card, Modal } from "react-bootstrap";
import axios from "axios";
import NavbarCustom from "./NavbarCustom";

function LecturerPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const weekDay = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [buses, setBuses] = useState([]);
  const [slots, setSlots] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [slotBusRelationships, setSlotBusRelationships] = useState([]);
  const [routeRegistrations, setRouteRegistrations] = useState([]);

  const [show, setShow] = useState(false);
  const [selectedBuses, setSelectedBuses] = useState([]);

  const times = ["7:00", "9:30", "13:00", "14:30", "16:00", "17:40"];
  const handleClose = () => setShow(false);

  const handleShow = (bus) => {
    setShow(true);
    setSelectedBuses(bus);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const busRes = await axios.get("http://localhost:3000/buses");
      const slotRes = await axios.get("http://localhost:3000/slots");
      const routeRes = await axios.get("http://localhost:3000/routes");
      const slotBusRes = await axios.get("http://localhost:3000/slot_bus");
      const routeRegistraionsRes = await axios.get(
        "http://localhost:3000/route_registrations"
      );
      setBuses(busRes.data);
      setSlots(slotRes.data);
      setRoutes(routeRes.data);
      setSlotBusRelationships(slotBusRes.data);
      setRouteRegistrations(routeRegistraionsRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  function checkSlot(targetWeekDay, time) {
    return slots
      .filter(
        (slot) =>
          slot.week_day === targetWeekDay && slot.departure_time === time
      )
      .flatMap((slot) =>
        slotBusRelationships
          .filter((sbr) => sbr.slot_id === slot.id)
          .map((sbr) => {
            const busForSlot = buses.find((bus) => bus.id === sbr.bus_id);
            return { ...busForSlot, slotId: sbr.id };
          })
      )
      .filter((bus) => bus);
  }
  const checkIfUserBookedSlot = (slot_bus) => {
    const userSlotRegistrations = routeRegistrations.filter(
      (registration) =>
        registration.user_id === user.id &&
        registration.slot_bus === slot_bus.slotId
    );
    console.log(userSlotRegistrations);

    return userSlotRegistrations.length > 0;
  };

  const handleRegister = () => {
    // Kiểm tra xem người dùng đã đặt slot hay chưa
    const hasBookedSlot = checkIfUserBookedSlot(selectedBuses);

    if (hasBookedSlot) {
      alert("Bạn đã đặt slot này rồi!");
    } else {
      // Thực hiện hành động đặt slot ở đây
      // ...
      alert("Đăng ký thành công!");
      handleClose();
    }
  };

  const cancelSlotBus = (slot_bus) => {
    
  }
  
  const entryBus = (time) =>
    weekDay.map((day) => (
      <td key={`${day}-${time}`}>
        <div>{console.log(checkSlot(day, time))}</div>
        {checkSlot(day, time).map((slot_bus) => {
          const route = routes.find((route) => route.id === slot_bus.routeId);

          return (
            <Card key={slot_bus.license_plate} className="m-1 p-2">
              <div>
                {route.start_location} - {route.end_location}
              </div>
              <div>License Plate: {slot_bus.license_plate}</div>

              {checkIfUserBookedSlot(slot_bus) ? (
                <Button
                onClick={() => cancelSlotBus(slot_bus)}
                className="mt-3"
                variant="danger"
              >
                Cancel
              </Button>
              ) : (
                <Button
                  onClick={() => handleShow(slot_bus)}
                  className="mt-3"
                  variant="outline-primary"
                >
                  Register
                </Button>
              )}
            </Card>
          );
        })}
      </td>
    ));

  return (
    <div>
      <div style={{ height: "70px" }}>
        <NavbarCustom />
      </div>
      <Table bordered>
        {/* show week_day */}
        <thead>
          <tr>
            <th colSpan={2}></th>
            {weekDay.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {times.map((time, index) => (
            <tr key={time}>
              {index % 3 === 0 && (
                <td rowSpan={3}>{index < 3 ? "Morning" : "Afternoon"}</td>
              )}
              <td>{time}</td>
              {entryBus(time)}
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bus detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ color: "#f46d2b" }}>
            Route:
            {
              routes.find((route) => route.id === selectedBuses.routeId)
                ?.start_location
            }{" "}
            -{" "}
            {
              routes.find((route) => route.id === selectedBuses.routeId)
                ?.end_location
            }
          </h4>
          <h6>License_plate: {selectedBuses.license_plate}</h6>
          <h6>Capacity: {selectedBuses.capacity}</h6>
          <h6>Time: </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LecturerPage;
