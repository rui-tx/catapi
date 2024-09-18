import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./styles.css";

import AuthContext from "../../contexts/AuthContext";
import ToastContext from "../../contexts/ToastContext";

function Login() {
  const [id, setId] = useState("");
  const { isLoggedIn, setLoggedIn, setUser, handleLogin } =
    useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  // redirect when login
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(id);
  };

  const loginUser = (id) => {
    const success = handleLogin(id);
    if (!success) {
      addToast("Login failed! Something went wrong... 😔", "toast-error");
      return;
    }

    addToast("You are logged in! Hi 👋", "toast-success");
  };

  return (
    <Block blk="block-embossed">
      <div className="login">
        <h2>Login / Register</h2>
        <p>
          Login to your account. If not found, an new account will be created.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" style={{ display: "none" }}>
              ID
            </label>
            <Input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="email / user / unique id"
              required
            />
          </div>
          <div className="button-group">
            <Button btn="success" type="submit">
              Login
            </Button>
          </div>
        </form>
        <p style={{ display: "none" }}>
          Don't have an account? <Link to="/register">Register here</Link>{" "}
        </p>
      </div>
    </Block>
  );
}

export default Login;
