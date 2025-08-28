import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name: "orders",
    initialState: [],
    reducers: {
        setOrders: (state, action) => {
            return action.payload;
        },
        addOrder: (state, action) => {
            state.push(action.payload);
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
            const existingOrder = state.find(order => order.id === orderId);
            if (existingOrder) {
                existingOrder.status = status;
            }
        }
    },
});

export const { setOrders, addOrder } = orderSlice.actions;
export default orderSlice.reducer;