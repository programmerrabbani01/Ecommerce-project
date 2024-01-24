import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useFormik } from "formik";
import { object, string } from "yup";
import { createColors } from "../features/color/colorApiSlice.js";
import {
  getAllColorsData,
  setMessageEmpty,
} from "../features/color/colorSlice.js";
import { useEffect } from "react";
import { createToaster } from "../utils/toastify.js";

let schema = object({
  name: string().required("Name Is Required"),
  colorCode: string().required("ColorCode Is Required"),
});

const AddColor = () => {
  const title = "Add Color - Digitic";

  const dispatch = useDispatch();

  const { error, message } = useSelector(getAllColorsData);

  const formik = useFormik({
    initialValues: {
      name: "",
      colorCode: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(createColors(values));

      // Reset the form after submission
      resetForm();
    },
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
  }, [dispatch, error, message]);

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Add Color</h3>

      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="error">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="">
            <CustomInput
              // type="color"
              type="text"
              label="Enter Color Name"
              name="name"
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              value={formik.values.name}
            />
          </div>
          <div className="error">
            {formik.touched.colorCode && formik.errors.colorCode ? (
              <div>{formik.errors.colorCode}</div>
            ) : null}
          </div>
          <div className="">
            <CustomInput
              type="color"
              label="Enter Color Code"
              name="colorCode"
              onChange={formik.handleChange("colorCode")}
              onBlur={formik.handleBlur("colorCode")}
              value={formik.values.colorCode}
            />
          </div>

          <button
            className="btn border-0 my-3 text-white"
            style={{ backgroundColor: "#d50101" }}
            type="submit"
          >
            Add Color
          </button>
        </form>
      </div>
    </>
  );
};

export default AddColor;
