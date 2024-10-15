// import {  useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const [auth, setAuth] = useState(false);

//   useEffect(() => {
//     if (localStorage.token) {
//       setAuth(true);
//     } else {
//       setAuth(false);
//     }
//   }, [auth]);

//   if (auth) {
//     return children;
//   }

//   return <Navigate to="/signin"  />;
// };

// export default PrivateRoute;
