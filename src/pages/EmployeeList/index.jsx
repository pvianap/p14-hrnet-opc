import React from 'react';
// import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';

// A great library for fuzzy filtering/sorting items
import { matchSorter } from 'match-sorter';

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    state,
    previousPage,
    setPageSize,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            ></th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <div>
          <pre>
            <code>{JSON.stringify(state.filters, null, 2)}</code>
          </pre>
        </div>
      </div>
    </>
  );
}

export default function EmployeeList() {
  const source = useSelector((state) => state.employees.employeesList);

  console.log('SOURCE: ', source);
  //convert data format
  const data = source.map((item) => {
    const convertedItem = {
      ...item,
      dateOfBirth: new Date(item.dateOfBirth).toLocaleDateString(),
      startDate: new Date(item.startDate).toLocaleDateString(),
    };
    return convertedItem;
  });

  console.log('CONVERTED DATA: ', data);

  // console.log('SOURCE: ', source);
  // const data = source.map((item) => {
  //   const dateOfBirth = new Date(item.dateOfBirth).toLocaleDateString();
  //   const startDate = new Date(item.startDate).toLocaleDateString();

  //   return {
  //     ...item,
  //     dateOfBirth,
  //     startDate,
  //   };
  // });

  // console.log('DATA: ', data);
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

  const { getTableProps, getTableBody, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <h1
        className="
      title"
      >
        List of Employees
      </h1>
      <Table columns={columns} data={data} />;
    </div>
  );
}
