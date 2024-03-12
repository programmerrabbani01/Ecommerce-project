import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuthData,
  setMessageEmpty,
} from "../features/user/userSlice.js";
import { useEffect } from "react";
import toastify, { createToaster } from "../utils/toastify.js";
import { resetPassword } from "../features/user/userApiSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import CustomInput from "../components/CustomInput/CustomInput.jsx";

// validate

let schema = object({
  newPassword: string().required("New Password is required"),
  password: string().required("Confirm Password is required"),
});

const ResetPassword = () => {
  const title = "Reset-Password - FLASHMART";

  const dispatch = useDispatch();
  const { error, message } = useSelector(getUserAuthData);
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
      <BreadCum title="Reset Password" />

      {/* Reset-Password  Start */}

      <div className="signUp_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="signUp_card">
                <h3>Reset Password</h3>
                <form
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
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
                  <div className="d-flex justify-content-center align-items-center gap-15">
                    <button
                      className="border-0 px-3 py-2 w-100 fw-bold text-white"
                      type="submit"
                      style={{ backgroundColor: "#d50101" }}
                    >
                      Reset Password
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
