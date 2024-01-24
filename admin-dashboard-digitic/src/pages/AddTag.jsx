import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useEffect } from "react";
import { createToaster } from "../utils/toastify.js";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllTagsData, setMessageEmpty } from "../features/tag/tagSlice.js";
import { createTag } from "../features/tag/tagApiSlice.js";

let schema = object({
  name: string().required("Name Is Required"),
});

const AddTag = () => {
  const title = "Add Tag - Digitic";

  const dispatch = useDispatch();

  const { error, message } = useSelector(getAllTagsData);

  

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(createTag(values));

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

      <h3 className="mb-4 title">Add Tag</h3>

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
              label="Enter Tag Name"
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
            Add Tag
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTag;
