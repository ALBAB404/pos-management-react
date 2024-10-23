import {
  Master,
  Dashboard,
  CategoryAdd,
  CategoryList,
  CategoryEdit,
  SubCategoryList,
  SubCategoryAdd,
  SubCategoryEdit,
  Login,
} from "@/components";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const auth = useSelector((state) => state.auth.value);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        {auth.token != null ? (
          <Route path="/" element={<Master />}>
            <Route index element={<Dashboard />} />
            <Route path="category/list" element={<CategoryList />} />
            <Route path="category/create" element={<CategoryAdd />} />
            <Route path="category/edit/:id?" element={<CategoryEdit />} />

            <Route path="sub-category/list" element={<SubCategoryList />} />
            <Route path="sub-category/create" element={<SubCategoryAdd />} />
            <Route path="sub-category/edit/:id?" element={<SubCategoryEdit />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
