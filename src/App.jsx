import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProjectRouter from './components/router/ProjectRouter.jsx';
import {RouterProvider} from "react-router-dom";
import { useEffect, useState } from 'react';
import PublicRouter from './components/router/PublicRouter.jsx';
import axios from 'axios';

const App = () => {

  const [auth, setAuth] = useState(false);
  
  useEffect(() => {
    if (localStorage.token) {
      setAuth(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
    }else{
      setAuth(false);
    }
  }, [])
  

  return (
    <>
      {
        auth ? <RouterProvider router={ProjectRouter} /> : <RouterProvider router={PublicRouter} />   
      }
    </>
  );
};

export default App;
