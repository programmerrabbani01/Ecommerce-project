import CustomInput from "../components/CustomInput/CustomInput.jsx";
import { useEffect } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toastify, { createToaster } from "../utils/toastify.js";
import { getAuthData, setMessageEmpty } from "../features/auth/authSlice.js";
import { resetPassword } from "../features/auth/authApiSlice.js";
import MetaData from "../components/HelmetData/MetaData.jsx";

// validate

let schema = object({
  newPassword: string().required("New Password is required"),
  password: string().required("Confirm Password is required"),
});

const ResetPassword = () => {
  const title = "Reset Password - FLASHMART";

  const dispatch = useDispatch();
  const { error, message } = useSelector(getAuthData);
  const navigate = useNavigate();

  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (data, actions) => {
      if (data.newPassword === data.password) {
        dispatch(resetPassword({ password: data.password, token: token }));
        actions.resetForm();
      } else {
        toastify("error", "Confirm password does not match");
      }
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
      navigate("/login");
    }
  }, [dispatch, error, message, navigate]);
  
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
          <h4 className="text-center title">Reset Password</h4>
          <p className="text-center">Please Enter Your New Password.</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="error">
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div>{formik.errors.newPassword}</div>
              ) : null}
            </div>
            <CustomInput
              type="password"
              id="password"
              label="New Password"
              name="newPassword"
              onChange={formik.handleChange("newPassword")}
              value={formik.values.newPassword}
            />

            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>

            <CustomInput
              type="password"
              id="confirmPassword"
              label="Confirm New Password"
              name="password"
              onChange={formik.handleChange("password")}
              value={formik.values.password}
            />

            <button
              className="border-0 px-3 py-2 w-100 fw-bold text-white"
              style={{ backgroundColor: "#d50101" }}
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
