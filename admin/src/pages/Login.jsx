import { Link, useNavigate } from "react-router-dom";
import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useEffect } from "react";
import { createToaster } from "../utils/toastify.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuthData,
  setMessageEmpty,
} from "../features/user/userSlice.js";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import { userLogin } from "../features/user/userApiSlice.js";

let loginSchema = object({
  email: string()
    .email("Email Should be valid")
    .required("Email Address Is Required"),
  password: string().required("Password Is Required"),
});

const Login = () => {
  const title = "Login - FLASHMART";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message } = useSelector(getUserAuthData);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(userLogin(values));
    },
  });

  //   handle messages
  useEffect(() => {
    if (error) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
      navigate("/");
    }
  }, [dispatch, error, message, navigate]);

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
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div className="error">
                    {formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <CustomInput
                    type="email"
                    label="Email Address"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="error">
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <CustomInput
                    type="password"
                    label="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
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
