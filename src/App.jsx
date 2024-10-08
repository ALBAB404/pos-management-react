import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProjectRouter from './components/router/ProjectRouter.jsx';
import {RouterProvider} from "react-router-dom";
import { useState } from 'react';
import PublicRouter from './components/router/PublicRouter.jsx';

const App = () => {

  const [auth, setAuth] = useState(false);
  

  return (
    <>
    {
      auth ? <RouterProvider router={ProjectRouter} /> : 
      <RouterProvider router={PublicRouter} />
      
    }
    </>
  );
};

export default App;
