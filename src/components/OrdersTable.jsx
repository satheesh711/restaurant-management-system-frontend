import { useState, useEffect } from "react";
import FoodSelection from "./FoodSelection";
import api from "../config/axiosConfig";

export default function OrderForm() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [waiters, setWaiters] = useState([]);
  const [selectedWaiter, setSelectedWaiter] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    api
      .get("/api/staff/waiters/available")
      .then((res) => setWaiters(res.data.data || []))
      .catch((err) => {
        console.error("Error fetching waiters:", err);
        setWaiters([]);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/staff/orders/addOrder", {
        name: formData.name,
        phone: formData.phone,
        waiterId: selectedWaiter,
      });
      const orderId = response.data.data;
      setOrderId(orderId);
      setIsSubmited(true);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  if (isSubmited) {
    return <FoodSelection id={orderId} />;
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
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
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
