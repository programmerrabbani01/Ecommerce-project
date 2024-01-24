import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";

const SignUp = () => {
  const title = "Sign-Up - Digitic";
  return (
    <>
      <MetaData title={title} />
      <BreadCum title="Create Account" />

      {/* SignUp Start*/}

      <div className="signUp_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="signUp_card">
                <h3>Create Account</h3>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="FirstName"
                      name="firstName"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="LastName"
                      name="lastName"
                    />
                  </div>

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
                  <div className="d-flex justify-content-center align-items-center gap-15">
                    <button className="button border-0" type="submit">
                      Create
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

export default SignUp;
