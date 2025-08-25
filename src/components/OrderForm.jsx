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
<<<<<<< HEAD
    api.get("/api/staff/waiters/available")
    .then(res => {
      console.log(res.data.data);
      setWaiters(res.data.data);
    })
    .catch(err => {
      console.error("Error fetching waiters:", err);
      setWaiters([]);})
=======
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
>>>>>>> 310a9fe06ea7314d1597061e028af52c7b010aba
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
    console.log(formData.name, formData.phone, selectedWaiter);
    const response = await api.post("/api/staff/orders/addOrder", {
      name: formData.name,
      phone: formData.phone,
      waiterId: selectedWaiter,
    });
    console.log("Order created:", response.data);
    const orderId = response.data.data;
    setOrderId(orderId);
    setIsSubmited(true);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};
=======
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
>>>>>>> 310a9fe06ea7314d1597061e028af52c7b010aba

  if (isSubmited) {
    return <FoodSelection id={orderId} />;
  }

  return (
<<<<<<< HEAD
    <>
      {!isSubmited && (
        <div>
          <h2>Orders</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Customer Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="name">Customer Phone Number: </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="waiter">Select Waiter: </label>
            <select
              id="waiter"
              value={selectedWaiter}
              onChange={(e) => setSelectedWaiter(e.target.value)}
              required
            >
              <option value="">Waiters</option>
              {waiters.map((waiter) => (
                <option key={waiter.waiterId} value={waiter.waiterId}>
                  {waiter.name}
                </option>
              ))}
            </select>
            <br />
            <button type="submit">Next</button>
          </form>
        </div>
      )}
      {isSubmited && <FoodSelection id={orderId} />}
    </>
=======
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
>>>>>>> 310a9fe06ea7314d1597061e028af52c7b010aba
  );
}