import { Link } from "react-router-dom";
import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";

const ForgotPassword = () => {
  const title = "Forgot-Password - Digitic";
  return (
    <>
      <MetaData title={title} />
      <BreadCum title="Forgot Password" />

      {/* Forgot-Password  Start */}

      <div className="forget_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="forgot_card">
                <h3>Reset Your Password</h3>
                <p className="text-center my-2 mb-3">
                  We will send you an email to reset your password
                </p>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-center gap-15">
                    <button className="button border-0" type="submit">
                      Submit
                    </button>
                    <Link to="/login" className="cancel">
                      Cancel
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

export default ForgotPassword;
