import React from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resgiter from "./components/Resgiter";
import 'bootstrap/dist/css/bootstrap.min.css';
import LecturerPage from "./components/LecturerPage";
import Profile from "./components/Profile";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/resgiter" element={<Resgiter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={<LecturerPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
