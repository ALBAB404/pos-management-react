import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, Login } from "@/components";

const PublicRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />, 
      },
    ]
  },
]);


export default PublicRouter;
