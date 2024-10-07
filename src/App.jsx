import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProjectRouter from './components/router/ProjectRouter.jsx';
import {RouterProvider} from "react-router-dom";

const App = () => {
  return (
    <>
      <RouterProvider router={ProjectRouter} />
    </>
  );
};

export default App;
