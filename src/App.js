import React from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resgiter from "./components/Resgiter";
import "bootstrap/dist/css/bootstrap.min.css";
import LecturerPage from "./components/LecturerPage";
import Profile from "./components/Profile";
import BookedBus from "./components/BookedBus";
import AdminLayout from "./components/AdminLayout";
import AdminLecturerInfo from "./components/AdminLecturerInfo";
import AdminRoute from "./components/AdminRoute";
import AdminSlotBus from "./components/AdminSlotBus";
import AdminSlot from "./components/AdminSlot";
import AdminBus from "./components/AdminBus";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/resgiter" element={<Resgiter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<LecturerPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookedbus" element={<BookedBus />} />
         
        </Routes>

        <Routes>
          <Route
            path="/admin/lecturer"
            element={
              <AdminLayout>
                <AdminLecturerInfo />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/route"
            element={
              <AdminLayout>
                <AdminRoute />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/bus"
            element={
              <AdminLayout>
                <AdminBus />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/slot"
            element={
              <AdminLayout>
                <AdminSlot />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/slotbus"
            element={
              <AdminLayout>
                <AdminSlotBus />
              </AdminLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
