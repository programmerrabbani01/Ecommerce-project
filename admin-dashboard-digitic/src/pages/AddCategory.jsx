import { useDispatch } from "react-redux";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useFormik } from "formik";
import { object, string } from "yup";
import { createProductCategories } from "../features/productCategory/pCategoryApiSlice.js";

let schema = object({
  name: string().required("Name Is Required"),
});

const AddCategory = () => {
  const title = "Add Category - Digitic";

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(createProductCategories(values));

      // Reset the form after submission
      resetForm();
    },
  });
  
  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Add Category</h3>

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
              label="Enter Category Name"
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
            Add Category
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
