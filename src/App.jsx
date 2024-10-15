import 'bootstrap/dist/css/bootstrap.min.css';
import { Master, Dashboard, CategoryAdd, Login } from "@/components";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';


const App = () => {

  const [auth, setAuth] = useState(false);
  
  useEffect(() => {
    if (localStorage.token) {
      setAuth(true);
    }else{
      setAuth(false);
    }
  }, [])
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {auth ? (
          <Route path="/" element={<Master />}>
            {/* These routes are nested under Master layout */}
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
