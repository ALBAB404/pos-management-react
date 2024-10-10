const GlobalFunction = {
  logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("phone");
    localStorage.removeItem("token");
  },
};

export default GlobalFunction;