import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";

const ResetPassword = () => {
  const title = "Reset-Password - Digitic";
  return (
    <>
      <MetaData title={title} />
      <BreadCum title="Reset Password" />

      {/* Reset-Password  Start */}

      <div className="signUp_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="signUp_card">
                <h3>Reset Password</h3>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Conform password"
                      name="ConformPassword"
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-15">
                    <button className="button border-0" type="submit">
                      Done
                    </button>
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

export default ResetPassword;
