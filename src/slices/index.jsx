import { createSlice } from '@reduxjs/toolkit';
const initData = [
  {
    id: 1,
    firstName: 'Jean-Jacques',
    lastName: 'Rousseau',
    startData: '21/01/1762',
    department: 'Marketing',
    dateOfBirth: '28/06/1712',
    street: 'Rue de Geneve',
    city: 'Geneva',
    state: 'AL',
    zipCode: '13600',
  },
  {
    id: 2,
    firstName: 'Pierre-Auguste',
    lastName: 'Renoir ',
    startData: '21/01/1900',
    department: 'Marketing',
    dateOfBirth: '25/02/1841',
    street: 'Rue de Geneve',
    city: 'Limoges',
    state: 'CA',
    zipCode: '13600',
  },
];

export const employeeSlice = createSlice({
  name: 'employees',
  initialState: { data: initData },
  reducers: {
    // add your non-async reducers here
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
    deleteEmployee: (state, action) => {
      const employeeIdToDelete = action.payload;
      return state.filter((employee) => employee.id !== employeeIdToDelete);
    },
    updateEmployee: (state, action) => {
      const { id, ...updatedEmployee } = action.payload;
      const existingEmployee = state.find((employee) => employee.id === id);
      if (existingEmployee) {
        Object.assign(existingEmployee, updatedEmployee);
      }
    },
  },
});
export const { addEmployee, updateEmployee, deleteEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
