import "./estilo.css";
import Barra from "../Barra";
import { Link } from "react-router-dom";

import { methodPOST, login } from "../../services/api";
function Login() {
  const log = async () => {
  const respuesta=await methodPOST(login, {
      username: "UsuarioPrueba",
      password: "123",
  });
    console.log(respuesta);
  };

  return (
    <div className="Auth-form-container" style={{ background: "gray" }}>
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
     
          
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
      
      <button className="btn btn-primary" onClick={()=> log()}>
                Submit
              </button>
    </div>
  );
}
export default Login;
