import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useEffect } from "react";
import { createToaster } from "../utils/toastify.js";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createSize } from "../features/size/sizeApiSlice.js";
import { getAllSizesData, setMessageEmpty } from "../features/size/sizeSlice.js";

let schema = object({
  name: string().required("Name Is Required"),
});

const AddSize = () => {
  const title = "Add Size - FLASHMART";

  const dispatch = useDispatch();

  const { error, message } = useSelector(getAllSizesData);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(createSize(values));

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

      <h3 className="mb-4 title">Add Size</h3>

      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="error">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="">
            <CustomInput
              type="text"
              label="Enter Size Name"
              name="name"
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              value={formik.values.name}
            />
          </div>

          <button
            className="btn border-0 my-3 text-white"
            style={{ backgroundColor: "#d50101" }}
            type="submit"
          >
            Add Size
          </button>
        </form>
      </div>
    </>
  );
};

export default AddSize;
