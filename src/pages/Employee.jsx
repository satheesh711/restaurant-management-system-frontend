import React, { useEffect, useState } from "react";
import api from "../config/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "../assets/Employee.css";
import Swal from "sweetalert2";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
  });

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/employees");
      console.log(res.data.data);
      if (res.data.success) {
        setEmployees(
          res.data.data.sort((a, b) => a.status.localeCompare(b.status))
        );
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Failed!", "Failed to fetch Employees", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!/^[A-Za-z ]+$/.test(formData.name.trim()))
      newErrors.name = "Name must contain only alphabets";
    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        formData.email.trim()
      )
    )
      newErrors.email = "Enter a valid email address";
    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.designation)
      newErrors.designation = "Please select a designation";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const payload = {
      ...formData,
      join_date: formData.join_date || null,
      leaving_date: formData.leaving_date || null,
    };
    try {
      if (editingEmployee) {
        console.log("Updating employee:", editingEmployee.empId, payload);
        const res = await api.put(
          `/api/admin/employees/update/${editingEmployee.empId}`,
          payload
        );
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Employee Updated Successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        const res = await api.post("/api/admin/employees/add", payload);

        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Employee Added Successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
      setIsModalOpen(false);
      setEditingEmployee(null);
      resetForm();
      fetchEmployees();
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/api/admin/employees/delete/${id}`);
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Employee Deleted  Successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      fetchEmployees();
    } catch (err) {
      console.log(err);
      Swal.fire("Failed!", "Failed to Deelet employee", "error");
    }
  };

  const openModal = (employee = null) => {
    setEditingEmployee(employee);
    setErrors({});
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
    setFormData({ name: "", email: "", phone: "", designation: "" });
    setErrors({});
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="employee-container container">
      <h2 className="mb-4 text-center text-primary">👥 Employee Management</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control search-input"
          placeholder="🔍 Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-success ms-3" onClick={() => openModal()}>
          ➕ Add Employee
        </button>
      </div>
      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
          <p>Loading employees...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped align-middle shadow-sm">
            <thead className="table-dark">
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
                    <td>
                      <span
                        className={`badge ${
                          emp.status === "ACTIVE"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td>{emp.designation}</td>
                    <td>{emp.join_date ? emp.join_date.split("T")[0] : "-"}</td>
                    <td>
                      {emp.leaving_date ? emp.leaving_date.split("T")[0] : "-"}
                    </td>
                    <td>
                      {emp.status === "ACTIVE" && (
                        <>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => openModal(emp)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(emp.empId)}
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-muted">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content card shadow-lg">
            <h3 className="text-center text-primary mb-3">
              {editingEmployee ? "✏️ Update Employee" : "➕ Add Employee"}
            </h3>
            <form onSubmit={handleSave}>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  onKeyPress={(e) => {
                    if (!/[A-Za-z ]/.test(e.key)) e.preventDefault();
                  }}
                  required
                />
                {errors.name && (
                  <div className="text-danger small">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value.replace(/\s/g, ""),
                    })
                  }
                  required
                />
                {errors.email && (
                  <div className="text-danger small">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  placeholder="Phone"
                  value={formData.phone}
                  maxLength="10"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  required
                />
                {errors.phone && (
                  <div className="text-danger small">{errors.phone}</div>
                )}
              </div>
              <div className="mb-3">
                <select
                  className={`form-select ${
                    errors.designation ? "is-invalid" : ""
                  }`}
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                  required
                >
                  <option value="">Select Designation</option>
                  <option value="STAFF">Staff</option>
                  <option value="WAITER">Waiter</option>
                </select>
                {errors.designation && (
                  <div className="text-danger small">{errors.designation}</div>
                )}
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-success me-2">
                  {editingEmployee ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;
