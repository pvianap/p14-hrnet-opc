import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import EmployeeForm from '../pages/EmployeeForm';
import EmployeeList from '../pages/EmployeeList';
import NotFound from '../pages/NotFound';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<EmployeeForm />} />
        <Route path="list" element={<EmployeeList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
