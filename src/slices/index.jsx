import { createSlice } from '@reduxjs/toolkit';
import uniqueId from '../helper/uniqueId';

export const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employeesList: [
      {
        id: 1,
        firstName: 'Jean-Jacques',
        lastName: 'Rousseau',
        startData: '21/01/1762',
        department: 'Marketing',
        dateOfBirth: '28/06/1712',
        street: 'Rue de Geneve',
        city: 'Geneva',
        state: 'Alabama',
        stateAbbr: 'AL',
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
        state: 'California',
        stateAbbr: 'CA',
        zipCode: '13600',
      },
    ],
  },
  reducers: {
    addEmployee: (state, action) => {
      console.log('State of reducers: ', JSON.stringify(state));
      action.payload.id = uniqueId(
        JSON.parse(JSON.stringify(state.employeesList))
      );
      state.employeesList.push(action.payload);
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
export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
