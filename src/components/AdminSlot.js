import { Button, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminSlot() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    const response = await axios.get("http://localhost:3000/slots");
    setSlots(response.data);
  };
  return (
    <>
      <h1 className="text-center mt-3">Slot Information</h1>
      <Button variant="primary" className="mb-3">
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
                <Button variant="primary" className="m-2">
                  Edit
                </Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default AdminSlot;
