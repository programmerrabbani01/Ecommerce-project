import { Link } from "react-router-dom";
import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";

const Login = () => {
  const title = "Login - Digitic";
  return (
    <>
      <MetaData title={title} />
      <BreadCum title="Login Now" />

      {/* Login Start*/}

      <div className="login_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="login_card">
                <h3>Login</h3>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="password"
                      name="password"
                    />
                  </div>
                  <div>
                    <Link to="/forgotPassword" className="forgotPassword">
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-15 loginButton">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signUp" className="button">
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
