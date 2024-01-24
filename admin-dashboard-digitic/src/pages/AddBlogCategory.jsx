import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { createToaster } from "../utils/toastify.js";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createBlogCategory } from "../features/blogCategory/blogCategoryApiSlice.js";
import {
  getAllBlogsCategoryData,
  setMessageEmpty,
} from "../features/blogCategory/blogCategorySlice.js";
import { useEffect } from "react";

let schema = object({
  name: string().required("Name Is Required"),
});

const AddBlogCategory = () => {
  const title = "Add Blog Category - Digitic";

  const dispatch = useDispatch();

  const { error, message } = useSelector(getAllBlogsCategoryData);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(createBlogCategory(values));

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

      <h3 className="mb-4 title">Add Blog Category</h3>

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
              label="Enter Blog Category Name"
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
            Add Blog Category
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlogCategory;
