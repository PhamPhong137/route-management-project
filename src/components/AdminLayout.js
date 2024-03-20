import React from "react";
import { Col, Row } from "react-bootstrap";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div>
      <Row>
        <Col sm={2}>
          <AdminSidebar />
        </Col>
        <Col sm={10}>{children}</Col>
      </Row>
    </div>
  );
}

export default AdminLayout;
