import { configureStore } from "@reduxjs/toolkit";
import constantSliceReducer from "./slices/constantSlice";
import employeeSliceReducer from "./slices/employeeSlice";

const store=configureStore({
  reducer: {
    "constants": constantSliceReducer,
    "employees": employeeSliceReducer
  }
});

export default store;