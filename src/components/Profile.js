import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import lecturer from "../images/lecturer.jpg";
import NavbarCustom from "./NavbarCustom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Profile = () => {
  let user;
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    gender: "",
    email: "",
    phone: "",
    role: "",
    address: "",
    department: "",
    language_preference: "",
  });

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProfile(user);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    const id = profile.id;
    await axios.put(`http://localhost:3000/users/${id}`, profile);
    toast.success('Update profile successfully', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    localStorage.setItem("user", JSON.stringify(profile));
    
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
  };

  return (
    <>
      <NavbarCustom />
      <ToastContainer />
      <Container>
        <Row className="mt-5">
          <Col sm={8}>
            <div className="card-body">
              <h3 className="mb-4">Information of lecturer</h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      required
                      name="firstName"
                      placeholder="Enter your first name"
                      type="text"
                      className="form-control"
                      value={profile?.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      required
                      name="lastName"
                      placeholder="Also your last name"
                      type="text"
                      className="form-control"
                      value={profile?.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Birthday</label>
                    <input
                      required
                      name="birthday"
                      placeholder="mm/dd/yyyy"
                      type="date"
                      className="form-control"
                      value={profile?.birthday}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Gender</label>
                    <select
                      name="gender"
                      className="form-select"
                      value={profile?.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option
                        value="Female"
                        selected={profile?.gender === "Female"}
                      >
                        Female
                      </option>
                      <option
                        value="Male"
                        selected={profile?.gender === "Male"}
                      >
                        Male
                      </option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      disabled
                      name="email"
                      placeholder="name@company.com"
                      type="email"
                      className="form-control"
                      value={profile?.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      required
                      name="phone"
                      placeholder="+12-345 678 910"
                      type="text"
                      className="form-control"
                      value={profile?.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <h5 className="my-4">Address</h5>
                <div className="row">
                  <div className="mb-3 col-sm-9">
                    <label className="form-label">Address</label>
                    <input
                      required
                      name="address"
                      placeholder="Enter your home address"
                      type="text"
                      className="form-control"
                      value={profile?.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-sm-5">
                    <label className="form-label">Department</label>
                    <input
                      required
                      name="department"
                      placeholder="Department"
                      type="text"
                      className="form-control"
                      value={profile?.department}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col-sm-5">
                    <label className="form-label">Language</label>
                    <input
                      required
                      name="language_preference"
                      placeholder="Language"
                      type="text"
                      className="form-control"
                      value={profile?.language_preference}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    Save All
                  </button>
                </div>
              </form>
            </div>
          </Col>

          <Col sm={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={lecturer} />
              <Card.Body>
                <Card.Title className="text-center">
                  {profile?.firstName + " " + profile?.lastName}
                </Card.Title>
                <Card.Text className="mt-3 ">{profile?.department}</Card.Text>
                <Card.Text className="mt-3 ">{profile?.address}</Card.Text>
                <Button variant="primary">Contact</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </>
  );
};

export default Profile;
