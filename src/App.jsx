import { useState } from 'react'
import React from "react";
import './App.css'
import Navbar from './components/Navbar'

function StaffPage() {
  return <h2 className="text-center mt-10 text-xl">Staff Page</h2>;
}

function ItemsPage() {
  return <h2 className="text-center mt-10 text-xl">Items Page</h2>;
}
function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/items" element={<ItemsPage />} />
      </Routes>
    </Router>
  );
}
export default App;