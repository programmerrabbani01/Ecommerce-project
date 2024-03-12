import { Link } from "react-router-dom";
import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordMail } from "../features/user/userApiSlice.js";
import { useEffect } from "react";
import {
  getUserAuthData,
  setMessageEmpty,
} from "../features/user/userSlice.js";
import { createToaster } from "../utils/toastify.js";
import CustomInput from "../components/CustomInput/CustomInput.jsx";

let schema = object({
  email: string()
    .email("Email Should be valid")
    .required("Email Address Is Required"),
});

const ForgotPassword = () => {
  const title = "Forgot-Password - FLASHMART";
  const dispatch = useDispatch();
  const { error, message } = useSelector(getUserAuthData);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (email, actions) => {
      dispatch(forgotPasswordMail(email));
      actions.resetForm();
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
    }
  }, [dispatch, error, message]);
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
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={formik.handleChange("email")}
                    value={formik.values.email}
                  />
                  <div className="d-flex flex-column justify-content-center align-items-center gap-15">
                    <button
                      className="border-0 px-3 py-2 w-100 fw-bold text-white"
                      type="submit"
                      style={{ backgroundColor: "#d50101" }}
                    >
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
