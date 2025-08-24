import React from "react";
import { Link } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <Link to="/login">
          <button className="login">
            Login
          </button>
        </Link>
      </nav>
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-3xl font-bold mb-8">Analysis</h2>
        <div className="flex gap-6">
          <Link to="/staff">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-2xl shadow hover:bg-blue-700 transition">
              Staff
            </button>
          </Link>

          <Link to="/items">
            <button className="Items">
              Items
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
