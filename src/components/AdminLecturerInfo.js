import { Button, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminLecturerInfo() {
  const [users, setUser] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3000/users");
    setUser(response.data);
  };

  return (
    <div>
      <h1 className="text-center mt-3">Lecturer Information</h1>
      <Button variant="primary" className="mb-3">Create new lecturer</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Role</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Phone</th>
            <th>Department</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.phone}</td>
              <td>{user.department}</td>
              <td>
                <Button variant="primary" className="m-2">View detail</Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminLecturerInfo;
