import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../config/axiosConfig";

function AdminDashboardMain() {
  const [summary, setSummary] = useState({
    employees: 0,
    items: 0,
    orders: 0,
    activeEmployees: 0,
    availableWaiters: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // const [empRes, itemsRes, ordersRes, activeEmpRes, waitersRes] =
        const [empRes, itemsRes, activeEmpRes, waitersRes] =
          await Promise.all([
            api.get("/api/admin/employees"),
            api.get("/api/staff/items/all"),
            // api.get("/api/staff/orders/allOrders"),
            api.get("/api/admin/employees/active"),
            api.get("/api/staff/waiters/available"),
          ]);

          console.log(waitersRes);

        setSummary({
          employees: empRes?.data.data.length,
          items: itemsRes?.data.data.length,
        //   orders: ordersRes?.data.data.length,
          activeEmployees: activeEmpRes?.data.data.length,
          availableWaiters: waitersRes?.data?.data?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="mb-4">Summary Reports</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h6>Total Employees</h6>
            <h2 className="text-primary">{summary.employees}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h6>Active Employees</h6>
            <h2 className="text-success">{summary.activeEmployees}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h6>Available Waiters</h6>
            <h2 className="text-warning">{summary.availableWaiters}</h2>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-center shadow-sm p-3">
            <h6>Total Items</h6>
            <h2 className="text-info">{summary.items}</h2>
          </div>
        </div>

        {/* <div className="col-md-6">
          <div className="card text-center shadow-sm p-3">
            <h6>Total Orders</h6>
            <h2 className="text-danger">{summary.orders}</h2>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default AdminDashboardMain;