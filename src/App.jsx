import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
import Employee from './pages/Employee';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/employee" element={<Employee />} />       
        </Routes>
      </Router>
    </>
  );
}

export default App;