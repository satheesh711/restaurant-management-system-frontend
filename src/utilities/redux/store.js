import { configureStore } from "@reduxjs/toolkit";
import constantSliceReducer from "./slices/constantSlice";
import employeeSliceReducer from "./slices/employeeSlice";
import itemSliceReducer  from "./slices/itemSlice";

const store=configureStore({
  reducer: {
    "constants": constantSliceReducer,
    "employees": employeeSliceReducer,
    "items" : itemSliceReducer
  }
});

export default store;