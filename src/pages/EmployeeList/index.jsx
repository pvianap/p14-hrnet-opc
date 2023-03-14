import React from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';

export default function EmployeeList() {
  const employees = useSelector((state) => state.employees.employeesList);

  const columns = [
    {
      name: 'First Name',
      selector: 'firstName',
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: 'lastName',
      sortable: true,
    },
    {
      name: 'Department',
      selector: 'department',
      sortable: true,
    },
    {
      name: 'Date of Birth',
      selector: 'dateOfBirth',
      sortable: true,
    },
    {
      name: 'Address',
      selector: (row) =>
        `${row.street}, ${row.city}  ${row.stateAbbr} ${row.zipCode}`,
      sortable: true,
    },
  ];

  return <DataTable title="Employee List" columns={columns} data={employees} />;
}
