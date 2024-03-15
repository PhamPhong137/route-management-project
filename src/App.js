import React from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Resgiter from "./components/Resgiter";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/resgiter" element={<Resgiter />} />
          <Route path="/" element={<Login />} />
          <Route path="/" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
