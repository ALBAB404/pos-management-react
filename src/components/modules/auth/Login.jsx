import axiosInstance from "@/services/axiosService.js";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Constants from "@/Constants";


const Login = () => {
  const [input, setInput] = useState({});
  const [errors, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleInput = (e) => {
    setInput(prevState => ({...prevState, [e.target.name] : e.target.value }));
  };

  const handleLogin = async(e) => {
     e.preventDefault();
     try {
      setIsLoading(true);
      const response =  await axiosInstance.post(`${Constants.BASE_URL}/login`, input)
      console.log(response);
      
      localStorage.name  = response.data.name;
      localStorage.email = response.data.email;
      localStorage.phone = response.data.phone;
      localStorage.photo = response.data.photo;
      localStorage.token = response.data.token;
      window.location.reload();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response.status == 422) {
        setError(error.response.data.errors)
      }
     }
  }

  useEffect(() => {
    if (localStorage.token) {
      navigate("/");
    }
  }, [])
  

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Login
                    </h3>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-floating mb-3">
                        <input
                          className={errors?.email != undefined ? "form-control is-invalid" : "form-control"}
                          id="inputEmail"
                          type={"email"}
                          name={"email"}
                          value={input.email}
                          onChange={handleInput}
                          placeholder="name@example.com"
                        />
                        <p className="text-danger">{ errors?.email != undefined ? errors?.email[0] : null }</p>
                        <label htmlFor="inputEmail">Email/Phone</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          className={errors?.password != undefined ? "form-control is-invalid" : "form-control"}
                          id="inputPassword"
                          type={"password"}
                          name={"password"}
                          value={input.password}
                          onChange={handleInput}
                          placeholder="Password"
                        />
                        <p className="text-danger">{ errors?.password != undefined ? errors?.password[0] : null }</p>
                        <label htmlFor="inputPassword">Password</label>
                      </div>
                      <div className="d-grid">
                      <button
                        className="btn btn-danger"
                        onClick={handleLogin}
                        dangerouslySetInnerHTML={{
                          __html: isLoading
                            ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Login....'
                            : 'Login',
                        }}
                      />
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center py-3">
                    <div className="small">
                      <a href="register.html">Need an account? Sign up!</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="layoutAuthentication_footer">
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">
                Copyright &copy; Your Website 2023
              </div>
              <div>
                <a href="#">Privacy Policy</a>
                &middot;
                <a href="#">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
