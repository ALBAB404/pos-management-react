import $ from 'jquery';
import Swal from 'sweetalert2'
import Constants from "@/Constants";
import axiosInstance from "@/services/axiosService.js";
import GlobalFunction from '../../GlobalFunction/GlobalFunction';


const NavBar = () => {

const handleToggle = () => {
  $('body').toggleClass('sb-sidenav-toggled')
}

const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logout!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response =  await axiosInstance.post(`${Constants.BASE_URL}/logout`)
        if (response.status === 200) {
          localStorage.removeItem("token");      
        }
        
        // window.location.reload();
      } catch (error) {
         GlobalFunction.logout();         
       }
    }
  });
}

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand ps-3" href="index.html">
        Start Bootstrap
      </a>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        href="#!"
        onClick={handleToggle}
      >
        <i className="fas fa-bars"></i>
      </button>
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <p className='text-light mt-3'>{localStorage.name ? localStorage.name : 'No User Name'}</p>
        </div>
      </form>
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="#!">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Activity Log
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button onClick={handleLogout} className="dropdown-item" href="#!">
                Logout
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
