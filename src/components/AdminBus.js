import { Button, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminBus() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    const response = await axios.get("http://localhost:3000/buses");
    setBuses(response.data);
  };

  return (
    <>
      <h1 className="text-center mt-3">Bus Information</h1>
      <Button variant="primary" className="mb-3">
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

export default AdminBus;
