import React, { useEffect, useState } from "react";
import axios from "axios";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
  });

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/admin/employees");
      if (res.data.success) {
        setEmployees(
          res.data.data.sort((a, b) => a.status.localeCompare(b.status))
        );
      }
    } catch (err) {
      console.log("Failed to fetch employees", err);
      alert("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      join_date: formData.join_date ? formData.join_date : null,
      leaving_date: formData.leaving_date ? formData.leaving_date : null,
    };

    try {
      if (editingEmployee) {
        await axios.put(
          `http://localhost:8080/api/admin/employees/update/${editingEmployee.empId}`,
          payload
        );
        alert("Employee updated successfully");
      } else {
        await axios.post(
          "http://localhost:8080/api/admin/employees/add",
          payload
        );
        alert("Employee added successfully");
      }
      setIsModalOpen(false);
      setEditingEmployee(null);
      resetForm();
      fetchEmployees();
    } catch (err) {
      console.log("Save failed", err);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting employee with id:", id);
      await axios.delete(
        `http://localhost:8080/api/admin/employees/delete/${id}`
      );
      alert("Employee deleted successfully");
      fetchEmployees();
    } catch (err) {
      console.log("Delete failed", err);
      alert("Failed to delete employee");
    }
  };

  const openModal = (employee = null) => {
    setEditingEmployee(employee);
    if (employee) {
      setFormData({
        ...employee,
        join_date: employee.join_date ? employee.join_date.split("T")[0] : "",
        leaving_date: employee.leaving_date
          ? employee.leaving_date.split("T")[0]
          : "",
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      designation: "",
    });
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Management</h2>

      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250, padding: 5 }}
        />
        <button onClick={() => openModal()} style={{ padding: "6px 12px" }}>
          Add Employee
        </button>
      </div>

      {loading ? (
        <p>Loading..</p>
      ) : (
        <table border="1" width="100%" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Designation</th>
              <th>Join Date</th>
              <th>Leaving Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.empId}>
                  <td>{emp.empId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.status}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.join_date ? emp.join_date.split("T")[0] : "-"}</td>
                  <td>
                    {emp.leaving_date ? emp.leaving_date.split("T")[0] : "-"}
                  </td>
                  {emp.status === "ACTIVE" && (
                    <td>
                      <button onClick={() => openModal(emp)}>Edit</button>{" "}
                      <button
                        onClick={() => handleDelete(emp.empId)}
                        style={{ color: "red" }}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              width: 400,
            }}
          >
            <h3>{editingEmployee ? "Update Employee" : "Add Employee"}</h3>
            <form onSubmit={handleSave}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <br />
              <br />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <br />
              <br />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
              <br />
              <br />
              <select
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                placeholder="select Designation"
              >
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
                <option value="WAITER">Waiter</option>
              </select>
              <br />
              <br />
              <button type="submit">
                {editingEmployee ? "Update" : "Add"}
              </button>{" "}
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;
