import React from "react";
import { Nav } from "react-bootstrap";
import {
  FaUserGraduate,
  FaMapSigns,
  FaBus,
  FaSitemap,
  FaSignOutAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import "../css/adminsidebar.css";

const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};
function AdminSidebar() {
  return (
    <div className="sidebar position-fixed">
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="#" className="dashboard">
          Dashboard
        </Nav.Link>
        <Nav.Link href="/admin/lecturer">
          <FaUserGraduate />
          Lecturer Infomation
        </Nav.Link>
        <Nav.Link href="/admin/route">
          <FaMapSigns /> Route Management
        </Nav.Link>
        <Nav.Link href="/admin/bus">
          <FaBus /> Bus Management
        </Nav.Link>
        <Nav.Link href="/admin/slot">
          <FaSitemap /> Slot Management
        </Nav.Link>
        <Nav.Link href="/admin/slotbus">
          <FaCalendarAlt /> Slot_Bus Management
        </Nav.Link>
        <Nav.Link className="logout" onClick={handleLogout}>
          <FaSignOutAlt /> Log out
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default AdminSidebar;
