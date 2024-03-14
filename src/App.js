import React from 'react';
import './App.css';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div >
     <Login/>
     <Routes>
        <Route path="/"  />
        <Route path="/"  />
        <Route path="/"  />
      </Routes>     
   
    </div>
  );
}

export default App;
