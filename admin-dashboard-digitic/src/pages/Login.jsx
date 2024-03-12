import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAuthData, setMessageEmpty } from "../features/auth/authSlice.js";
import { createToaster } from "../utils/toastify.js";
import { adminLogin } from "../features/auth/authApiSlice.js";
import MetaData from "../components/HelmetData/MetaData.jsx";

const Login = () => {
  const title = "LogIn - FLASHMART";

  const dispatch = useDispatch();
  const { error, message, user } = useSelector(getAuthData);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // handle input change

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submit

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(adminLogin(input));
  };

  let schema = object({
    email: string()
      .email("Email Should Be Valid")
      .required("Email Is Required"),
    password: string().required("Password Is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
  });

  useEffect(() => {
    if (error) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
    }
    if (user) {
      navigate("/");
    }
  }, [dispatch, error, message, user, navigate]);

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <div
        className="py-5"
        style={{ backgroundColor: "#d50101", minHeight: "100vh" }}
      >
        <br />
        <br />
        <br />
        <div className="my-5 w-50 bg-white rounded-3 mx-auto p-4">
          <h4 className="text-center title ">Sign In</h4>
          <p className="text-center ">Log In To Your Account To Continue.</p>
          <form onSubmit={handleFormSubmit}>
            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <CustomInput
              type="text"
              id="email"
              label="Email Address"
              name="email"
              onChange={handleInputChange}
              value={input.email}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <CustomInput
              type="password"
              id="password"
              label="Password"
              name="password"
              onChange={handleInputChange}
              value={input.password}
            />

            <div className="mb-3 text-end">
              <Link
                to="/forGotPassword"
                className="text-dark text-decoration-none"
              >
                Forgot Password ?
              </Link>
            </div>

            <button
              className="border-0 px-3 py-2 w-100 fw-bold text-center text-white text-decoration-none fs-5"
              style={{ backgroundColor: "#d50101" }}
              type="submit"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
