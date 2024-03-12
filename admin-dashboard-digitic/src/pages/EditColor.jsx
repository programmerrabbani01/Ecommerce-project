import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  getASingleColor,
  updateColor,
} from "../features/color/colorApiSlice.js";
import {
  getAllColorsData,
  setMessageEmpty,
} from "../features/color/colorSlice.js";
import { useEffect } from "react";
import { createToaster } from "../utils/toastify.js";
import { useNavigate, useParams } from "react-router-dom";

let schema = object({
  name: string().required("Name Is Required"),
  colorCode: string().required("ColorCode Is Required"),
});

const EditColor = () => {
  const title = "Add Color - FLASHMART";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const { error, message, loader, singleColor } = useSelector(getAllColorsData);

  const formik = useFormik({
    initialValues: {
      name: "",
      colorCode: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      dispatch(updateColor({ values, id }));
    },
  });

  // get a single color by id
  useEffect(() => {
    dispatch(getASingleColor(id));
  }, [dispatch, id]);

  // message handlers
  useEffect(() => {
    if (error) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
      navigate("/colorList");
    }
  }, [dispatch, error, message, navigate]);

  useEffect(() => {
    // Check if singleTag is not null before setting form values
    if (singleColor) {
      formik.setValues({
        ...formik.values,
        name: singleColor.name || "",
        colorCode: singleColor.colorCode || "",
      });
    }
  }, [singleColor, formik.setValues]);

  if (loader) {
    return <>Loading ....</>;
  } else if (loader || singleColor == null) {
    return navigate("/colorList");
  }

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Edit Color</h3>

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
            Update Color
          </button>
        </form>
      </div>
    </>
  );
};

export default EditColor;
