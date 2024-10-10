import { createBrowserRouter } from "react-router-dom";
import { Master, Dashboard, CategoryAdd, Login } from "@/components";
import PrivateRoute from "./PrivateRoute";

const ProjectRouter = createBrowserRouter([
  {
    path: "/",
    element: <Master></Master>,
    children: [
      {
        path: '/',
        element: (
          <Dashboard />
        ),
      },
      {
        path: '/signin',
        element: <Login />,
      },
      {
        path: "/category/create", // Removed leading slash
        element: <CategoryAdd />,
      },
    ],
  },
]);

export default ProjectRouter;


