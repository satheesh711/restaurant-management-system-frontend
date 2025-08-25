import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import api from "../config/axiosConfig";

export default function FoodSelection({id}) {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
<<<<<<< HEAD
    axios
      .get("http://localhost:8081/api/staff/items/all")
=======
    api
      .get("/api/staff/items/all")
>>>>>>> fb181301e573e786caaba2cf5d0463d295b43c47
      .then((res) => {
        if (res.data.success) {
        setItems(res.data.data);
      } else {
        console.error("Failed to fetch items:", res.data.message);
      }
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  const handleAdd = (itemId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: 1, 
    }));
  };

  const handleIncrement = (itemId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  };

  const handleDecrement = (itemId) => {
    setSelectedItems((prev) => {
      if (prev[itemId] === 1) {
        const newItems = { ...prev };
        delete newItems[itemId]; 
        return newItems;
      }
      return {
        ...prev,
        [itemId]: prev[itemId] - 1,
      };
    });
  };

  const handleConfirm = async () => {
    const payload = Object.entries(selectedItems).map(([itemId, qty]) => {
  const item = items.find((i) => i.id === parseInt(itemId));
  return {
    orderId: id,   
    itemId: parseInt(itemId),
    quantity: qty,
    price: item.price
  };
});
  console.log(payload);
  try {
<<<<<<< HEAD
    await axios.post("http://localhost:8081/api/staff/order-details", payload, {
=======
    await api.post("/api/staff/order-details", payload, {
>>>>>>> fb181301e573e786caaba2cf5d0463d295b43c47
      headers: { "Content-Type": "application/json" }
    })
    console.log("Items added successfully");

<<<<<<< HEAD
    await axios.put(
      `http://localhost:8081/api/staff/orders/updateAmount/${id}`,
=======
    await api.put(
      `/api/staff/orders/updateAmount/${id}`,
>>>>>>> fb181301e573e786caaba2cf5d0463d295b43c47
      null,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Amount updated successfully");
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
};
    
  return (
    <div>
      <h2>Select Food Items</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "30%",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>₹{item.price}</p>
            {selectedItems[item.id] ? (
              <>
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <span> {selectedItems[item.id]} </span>
                <button onClick={() => handleIncrement(item.id)}>+</button>
              </>
            ) : (
              <button onClick={() => handleAdd(item.id)}>Add</button>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleConfirm} style={{ marginTop: "20px" }}>
        Confirm
      </button>
    </div>
  );
}
