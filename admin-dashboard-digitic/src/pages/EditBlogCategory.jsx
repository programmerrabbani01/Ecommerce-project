import { useEffect } from "react";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useFormik } from "formik";
import { object, string } from "yup";
import { createToaster } from "../utils/toastify.js";
import {
  getAllBlogsCategoryData,
  setMessageEmpty,
} from "../features/blogCategory/blogCategorySlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleBlogCategory,
  updateBlogCategory,
} from "../features/blogCategory/blogCategoryApiSlice.js";

let schema = object({
  name: string().required("Name Is Required"),
});

const EditBlogCategory = () => {
  const title = "Edit Blog Category - Digitic";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const { error, message, singleBlogCategory, loader } = useSelector(
    getAllBlogsCategoryData
  );

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      dispatch(updateBlogCategory({ values, id }));
    },
  });

  //   get single blog category b
  useEffect(() => {
    dispatch(getSingleBlogCategory(id));
  }, [dispatch, id]);

  // handle messages
  useEffect(() => {
    if (error) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
      navigate("/blogCategoryList");
    }
  }, [dispatch, error, message]);

  // set previous values

  useEffect(() => {
    if (singleBlogCategory) {
      formik.setValues({
        ...formik.values,
        name: singleBlogCategory?.name || "",
      });
    }
  }, [singleBlogCategory, formik.setValues]);

  if (loader) {
    return <>Loading . . . .</>;
  } else if (loader || singleBlogCategory == null) {
    return navigate("/blogCategoryList");
  }

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Edit Blog Category</h3>

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
            Update Blog Category
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBlogCategory;
