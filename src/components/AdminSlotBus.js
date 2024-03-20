import { Button, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminSlotBus() {
  const [slotBuses, setSlotBuses] = useState([]);

  useEffect(() => {
    fetchSlotBuses();
  }, []);

  const fetchSlotBuses = async () => {
    const response = await axios.get("http://localhost:3000/slot_bus");
    setSlotBuses(response.data);
    console.log(response.data);
  };
  return (
    <>
      <h1 className="text-center mt-3">Slot Bus Information</h1>
      <Button variant="primary" className="mb-3">
        Create new slot bus
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Slot_Id</th>
            <th>Bus_Id</th>
            <th>RouteId</th>
          </tr>
        </thead>
        <tbody>
          {slotBuses.map((slotBus) => (
            <tr key={slotBus.id}>
              <td>{slotBus.id}</td>
              <td>{slotBus.slot_id}</td>
              <td>{slotBus.bus_id}</td>
              <td>{slotBus.route_id}</td>
              <td>
                <Button variant="primary" className="m-2">Edit</Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default AdminSlotBus;
