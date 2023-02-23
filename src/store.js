import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './slices';
const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

export default store;
