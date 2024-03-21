import { Button, Modal, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminLecturerInfo() {
  const [users, setUser] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [detailUser, setDetailUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleShowDetail = (user) => {
    setDetailUser(user);
    setShowDetail(true);
  };

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3000/users");
    setUser(response.data);
  };
  const handleDelete = async (userId) => {
    try {

      await axios.delete(`http://localhost:3000/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Could not delete the user", error);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-3">Lecturer Information</h1>
      <Button variant="primary" className="mb-3">
        Create new lecturer
      </Button>
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
                <Button
                  variant="primary"
                  className="m-2"
                  onClick={() => handleShowDetail(user)}
                >
                  View detail
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(user.id)} 
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showDetail} onHide={() => setShowDetail(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lecturer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailUser && (
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Email</td>
                  <td>{detailUser.email}</td>
                </tr>
                <tr>
                  <td>First Name</td>
                  <td>{detailUser.firstName}</td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>{detailUser.lastName}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{detailUser.phone}</td>
                </tr>
                <tr>
                  <td>Department</td>
                  <td>{detailUser.department}</td>
                </tr>
                <tr>
                  <td>Language Preference</td>
                  <td>{detailUser.language_preference}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>{detailUser.role}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{detailUser.address}</td>
                </tr>
                <tr>
                  <td>Birthday</td>
                  <td>{detailUser.birthday}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>{detailUser.gender}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetail(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminLecturerInfo;
