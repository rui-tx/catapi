import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

import AuthContext from "../../contexts/AuthContext";
import ToastContext from "../../contexts/ToastContext";

function Logout() {
  const { setLoggedIn, setUser } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setLoggedIn(false);
      setUser(null);

      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");

      addToast("You have been logged out, goodbye!", "toast-success");
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  return;
}

export default Logout;
