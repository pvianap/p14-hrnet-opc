import React from 'react';
// import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';

export default function EmployeeList() {
  const employees = useSelector((state) => state.employees.employeesList);

  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName', // accessor is the "key" in the data
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Department',
        accessor: 'department',
      },
      {
        Header: 'Date of Birth',
        accessor: 'dateOfBirth',
      },
      {
        Header: 'Address',
        accessor: (row) =>
          `${row.street}, ${row.city}  ${row.stateAbbr} ${row.zipCode}`,
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBody,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  // const columns = [
  //   {
  //     name: 'First Name',
  //     selector: 'firstName',
  //     sortable: true,
  //   },
  //   {
  //     name: 'Last Name',
  //     selector: 'lastName',
  //     sortable: true,
  //   },
  //   {
  //     name: 'Department',
  //     selector: 'department',
  //     sortable: true,
  //   },
  //   {
  //     name: 'Date of Birth',
  //     selector: 'dateOfBirth',
  //     sortable: true,
  //   },
  //   {
  //     name: 'Address',
  //     selector: (row) =>
  //       `${row.street}, ${row.city}  ${row.stateAbbr} ${row.zipCode}`,
  //     sortable: true,
  //   },
  // ];

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps}>
            {headerGroup.map}
          </TableRow>
        ))}
      </TableHead>
    </Table>
  );
  // <DataTable title="Employee List" columns={columns} data={employees} />;
}
