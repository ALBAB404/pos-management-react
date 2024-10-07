import { createBrowserRouter } from "react-router-dom";
import { Master, Dashboard } from "@/components";

const ProjectRouter = createBrowserRouter([
  {
    path: "/",
    element: <Master />,
    children: [
      {
        path: "/",
        element: <Dashboard />, 
      },
    ]
  },
]);


export default ProjectRouter;
