import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProjectRouter from './components/router/ProjectRouter.jsx';
import {RouterProvider} from "react-router-dom";
import { useEffect, useState } from 'react';
import PublicRouter from './components/router/PublicRouter.jsx';

const App = () => {

  const [auth, setAuth] = useState(false);
  
  useEffect(() => {
    if (localStorage.token) {
      setAuth(true);
    }else{
      setAuth(false);
    }
  }, [])
  
  console.log(auth);
  
  

  return (
    <>
      {
        <RouterProvider router={ ProjectRouter} /> 
      }
    </>
  );
};

export default App;
