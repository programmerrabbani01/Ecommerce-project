import CustomInput from "../components/CustomInput/CustomInput.jsx";
import { useEffect } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAuthData, setMessageEmpty } from "../features/auth/authSlice.js";
import { forgotPasswordMail } from "../features/auth/authApiSlice.js";
import { createToaster } from "../utils/toastify.js";
import MetaData from "../components/HelmetData/MetaData.jsx";

let schema = object({
  email: string()
    .email("Email Should be valid")
    .required("Email Address Is Required"),
});

const ForGotPassword = () => {
  const title = "Forget Password - FLASHMART";

  const dispatch = useDispatch();
  const { error, message } = useSelector(getAuthData);

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

      {/*  */}

      <div
        className="py-5"
        style={{ backgroundColor: "#d50101", minHeight: "100vh" }}
      >
        <br />
        <br />
        <br />
        <div className="my-5 w-50 bg-white rounded-3 mx-auto p-4">
          <h4 className="text-center title">Forgot Password</h4>
          <p className="text-center ">
            Please Enter Your Email For Reset Password.
          </p>
          <form onSubmit={formik.handleSubmit}>
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

            <button
              className="border-0 px-3 py-2 w-100 fw-bold text-white"
              style={{ backgroundColor: "#d50101" }}
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForGotPassword;
