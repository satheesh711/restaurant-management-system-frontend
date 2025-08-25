import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersTable() {
//   const [orders, setOrders] = useState([]);
const [orders, setOrders] = useState([
    {
      ordId: 1,
      custId: 101,
      wtrId: 1,
      ordDate: "2025-08-23",
      amount: 450.0,
      status: "Pending",
    },
    {
      ordId: 14,
      custId: 102,
      wtrId: 2,
      ordDate: "2025-08-22",
      amount: 300.0,
      status: "Completed",
    },
    {
      ordId: 3,
      custId: 103,
      wtrId: 3,
      ordDate: "2025-08-21",
      amount: 150.0,
      status: "Cancelled",
    },
    {
      ordId: 4,
      custId: 104,
      wtrId: 2,
      ordDate: "2025-08-20",
      amount: 600.0,
      status: "Pending",
    },
  ]);

  const [statuses] = useState(["Pending", "Cancelled", "Completed"]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/staff/orders/allOrders");
//       if (res.data.success) setOrders(res.data.data);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     }
//   };

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/staff/orders/updateStatus?orderId=${orderId}&status=${newStatus}`
      );
      setOrders((prev) =>
        prev.map((order) =>
          order.ordId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

   const getAvailableStatuses = (currentStatus) => {
    if (currentStatus === "Pending") {
      return statuses.filter((s) => s !== "Pending");
    }
    return [];
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders Table</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Customer ID</th>
            <th style={thStyle}>Waiter ID</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const availableStatuses = getAvailableStatuses(order.status);
            return (
              <tr
                key={order.ordId}
                style={{ textAlign: "center", borderBottom: "1px solid #ccc" }}
              >
                <td style={tdStyle}>{order.ordId}</td>
                <td style={tdStyle}>{order.custId}</td>
                <td style={tdStyle}>{order.wtrId}</td>
                <td style={tdStyle}>{order.ordDate}</td>
                <td style={tdStyle}>₹{order.amount}</td>
                <td style={tdStyle}>{order.status}</td>
                <td style={tdStyle}>
                  {availableStatuses.length > 0 ? (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.ordId, e.target.value)
                      }
                      style={selectStyle}
                    >
                      <option value="">Change Status</option>
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
          })}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "10px",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "10px",
};

const selectStyle = {
  padding: "5px 10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  backgroundColor: "#f7f7f7",
};
