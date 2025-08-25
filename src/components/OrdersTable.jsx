import { useEffect, useState } from "react";
import axios from "axios";
import api from "../config/axiosConfig";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [statuses] = useState(["Pending", "Cancelled", "Completed"]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/staff/orders/allOrders");
      if (res.data.success) setOrders(res.data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(
        `/api/staff/orders/updateStatus?orderId=${orderId}&status=${newStatus}`
      );
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getAvailableStatuses = (currentStatus) => {
    if (currentStatus === "PENDING") {
      return statuses.filter((s) => s !== "Pending");
    }
    return [];
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Orders Table</h2>
      <div className="d-flex justify-content-between mb-2">
        <span>
          Total Records: <strong>{orders.length}</strong>
        </span>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
      </div>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Waiter ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.length > 0 ? (
            currentOrders.map((order, index) => {
              const availableStatuses = getAvailableStatuses(order.status);
              return (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.customerId}</td>
                  <td>{order.waiterId}</td>
                  <td>{order.orderDate}</td>
                  <td>₹{order.amount}</td>
                  <td>{order.status}</td>
                  <td>
                    {availableStatuses.length > 0 ? (
                      <select
                        className="form-select form-select-sm"
                        onChange={(e) =>
                          handleStatusChange(order.orderId, e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {availableStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No records available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages).keys()].map((num) => (
            <li
              key={num + 1}
              className={`page-item ${currentPage === num + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(num + 1)}
              >
                {num + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
