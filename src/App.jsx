import 'bootstrap/dist/css/bootstrap.min.css';
import { Master, Dashboard, CategoryAdd, Login } from "@/components";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

const App = () => {
  const auth = useSelector((state) => state.auth.value)
  
  
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        {auth.token != null ? (
          <Route path="/" element={<Master />}>
            <Route index element={<Dashboard />} />
            <Route path="category/create" element={<CategoryAdd />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
