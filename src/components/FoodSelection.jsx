import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function FoodSelection({orderId}) {
    const mockItems = [
    {
      item_id: 1,
      name: "Burger",
      image: "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps28800_UG143377D12_18_1b_RMS.jpg",
      description: "Delicious chicken burger",
      price: 150.0,
      category: "Fast Food",
      availability: "Available",
      status: "Active",
    },
    {
      item_id: 2,
      name: "Pizza",
      image: "https://via.placeholder.com/100",
      description: "Cheesy Veg Pizza",
      price: 250.0,
      category: "Fast Food",
      availability: "Available",
      status: "Active",
    },
    {
      item_id: 3,
      name: "Pasta",
      image: "https://via.placeholder.com/100",
      description: "Creamy White Sauce Pasta",
      price: 200.0,
      category: "Fast Food",
      availability: "Available",
      status: "Active",
    },
    {
      item_id: 4,
      name: "Sandwich",
      image: "https://via.placeholder.com/100",
      description: "Veg Sandwich",
      price: 100.0,
      category: "Fast Food",
      availability: "Available",
      status: "Active",
    },
  ];
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/api/items/all")
    //   .then((res) => setItems(res.data))
    //   .catch((err) => console.error("Error fetching items:", err));
    setItems(mockItems);
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

  const handleConfirm = () => {
     const payload = {
    items: Object.entries(selectedItems).map(([itemId, qty]) => {
      const item = items.find((i) => i.item_id === parseInt(itemId));
      return {
        itemId: parseInt(itemId),
        quantity: qty,
        price: item.price, 
      };
    }),
  };
  console.log(payload);
    // axios
    //   .post("http://localhost:8080/api/order-details/add", payload)
    //   .then((res) => {
    //     console.log("Items added successfully");
    //   })
    //   .catch((err) => {
    //     console.error("Error:", err.response?.data || err.message);
    //   });
    // call updateAmount 
  };

  return (
    <div>
      <h2>Select Food Items</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {items.map((item) => (
          <div
            key={item.item_id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "30%",
              boxSizing: "border-box",
              textAlign: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>₹{item.price}</p>
            {selectedItems[item.item_id] ? (
              <>
                <button onClick={() => handleDecrement(item.item_id)}>-</button>
                <span> {selectedItems[item.item_id]} </span>
                <button onClick={() => handleIncrement(item.item_id)}>+</button>
              </>
            ) : (
              <button onClick={() => handleAdd(item.item_id)}>Add</button>
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
