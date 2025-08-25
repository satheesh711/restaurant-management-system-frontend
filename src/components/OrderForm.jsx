import { useState, useEffect } from "react";
import FoodSelection from "./FoodSelection";
import api from "../config/axiosConfig";

export default function OrderForm() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [waiters, setWaiters] = useState([]);
  const [selectedWaiter, setSelectedWaiter] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get("/api/staff/waiters/available")
      .then((res) => {
        console.log(res.data.data);
        setWaiters(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching waiters:", err);
        setWaiters([]);
      });
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;

  if (e.target.name === "phone") {
    value = value.replace(/\D/g, "").substring(0, 10);
    setError(!/^[6-9]\d{9}$/.test(value));
  } else if (e.target.name === "name") {
    value = value.replace(/[^a-zA-Z ]/g, "");
  }

  setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error || !formData.name || !selectedWaiter) return;
    setIsSubmited(true);
  };

  if (isSubmited) {
    return (
      <FoodSelection
        name={formData.name}
        phone={formData.phone}
        waiterId={selectedWaiter}
      />
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Create Order</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter customer name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {error && (
                <div className="invalid-feedback">
                  Mobile Number should start with number between 6-9 and should contain exactly 10 digits
                </div>
              )}
                </div>

                <div className="mb-3">
                  <label htmlFor="waiter" className="form-label">
                    Select Waiter
                  </label>
                  <select
                    className="form-select"
                    id="waiter"
                    value={selectedWaiter}
                    onChange={(e) => setSelectedWaiter(e.target.value)}
                    required
                  >
                    <option value="">Choose waiter</option>
                    {waiters.map((waiter) => (
                      <option key={waiter.waiterId} value={waiter.waiterId}>
                        {waiter.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Next
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
