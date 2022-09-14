
import './estilo.css';
import Barra from '../Barra'
import { Link } from 'react-router-dom';


function Login() {

    return (
        <div className="Auth-form-container" style={{background:'gray'}}>
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
                    <Link to={'dashboard'}>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    </Link>
                </div>
                <p className="forgot-password text-right mt-2">
                    Forgot <a href="#">password?</a>
                </p>
            </div>
        </form>
    </div>
    )
}
export default Login;