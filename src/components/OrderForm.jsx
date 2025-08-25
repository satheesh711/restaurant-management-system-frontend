import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FoodSelection from "./FoodSelection";

export default function OrderForm() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [waiters, setWaiters] = useState([]);
  const [selectedWaiter, setSelectedWaiter] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [orderId, setOrderId] = useState(0)
  useEffect(() => {
    axios.get("http://localhost:8081/api/staff/waiters/available")
    .then(res => {
      console.log(res.data.data);
      setWaiters(res.data.data);
    })
    .catch(err => {
      console.error("Error fetching waiters:", err);
      setWaiters([]);})
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.name, formData.phone, selectedWaiter);
      const response = await axios.post("http://localhost:8081/api/staff/orders/addOrder", {
        name: formData.name,
        phone: formData.phone,
        waiterId: selectedWaiter
      });
      console.log("Order created:", response.data); 
      const orderId = response.data.data;
    setOrderId(orderId);
    setIsSubmited(true);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
    
  };

  return (
    <div>
    {
    isSubmited || <div>
<h2>Orders</h2>
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Customer Name: </label>
      <input type="text" id="name" name="name" placeholder="Name" onChange={handleChange}  required/>
      <br/>
      <label htmlFor="name">Customer Phone Number: </label>
      <input type="text" id="phone" name="phone" placeholder="Phone Number" onChange={handleChange} required />
      <br/>
        <label htmlFor="waiter">Select Waiter: </label>
      <select id="waiter" value={selectedWaiter} onChange={(e) => setSelectedWaiter(e.target.value)} required>
        <option value="">Waiters</option>
        {waiters.map(waiter => (
          <option key={waiter.waiterId} value={waiter.waiterId}>{waiter.name}</option>
        ))} 
      </select>
      <br/>
      <button type="submit">Next</button>
    </form>
    </div>
    }
    {isSubmited && <FoodSelection id={orderId} />}
    

    </div>
  );
}
