import BreadCum from "../components/BreadCum.jsx";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/MetaData.jsx";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createToaster } from "../utils/toastify.js";
import {
  getUserAuthData,
  setMessageEmpty,
} from "../features/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { userRegistration } from "../features/user/userApiSlice.js";

let signUpSchema = object({
  firstName: string().required("First Name Is Required"),
  lastName: string().required("Last Name Is Required"),
  email: string()
    .email("Email Should be valid")
    .required("Email Address Is Required"),
  mobile: string().required("Mobile Number Is Required"),
  password: string().required("Password Is Required"),
});

const SignUp = () => {
  const title = "Sign-Up - FLASHMART";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message } = useSelector(getUserAuthData);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(userRegistration(values));
      resetForm();
    },
  });

  //   handle messages
  useEffect(() => {
    if (error) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      console.log(message);
      createToaster(message, "success");
      dispatch(setMessageEmpty());
      navigate("/login");
    }
  }, [dispatch, error, message, navigate]);

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
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div className="error">
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div>{formik.errors.firstName}</div>
                    ) : null}
                  </div>
                  <CustomInput
                    type="text"
                    label="FirstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="error">
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div>{formik.errors.lastName}</div>
                    ) : null}
                  </div>
                  <CustomInput
                    type="text"
                    label="LastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
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
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div>{formik.errors.mobile}</div>
                    ) : null}
                  </div>
                  <CustomInput
                    type="tel"
                    label="Mobile Number"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
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
