import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useEffect } from "react";
import {
  getASingleProductCategory,
  updateProductCategory,
} from "../features/productCategory/pCategoryApiSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllProductCategoryData,
  setMessageEmpty,
} from "../features/productCategory/pCategorySlice.js";
import { createToaster } from "../utils/toastify.js";

let schema = object({
  name: string().required("Name Is Required"),
});

const EditCategory = () => {
  const title = "Add Category - FLASHMART";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const { error, message, loader, singleProductCategory } = useSelector(
    getAllProductCategoryData
  );

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      dispatch(updateProductCategory({ values, id }));
    },
  });

  useEffect(() => {
    dispatch(getASingleProductCategory(id));
  }, [dispatch, id]);

  //   message handle
  useEffect(() => {
    if (error) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
      navigate("/categoryList");
    }
  }, [dispatch, error, message]);

  // set previous values
  
  useEffect(() => {
    if (singleProductCategory) {
      formik.setValues({
        ...formik.values,
        name: singleProductCategory?.name || "",
      });
    }
  }, [singleProductCategory, formik.setValues]);

  if (loader) {
    return <>Loading . . . .</>;
  } else if (loader || singleProductCategory == null) {
    return navigate("/categoryList");
  }

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Edit Category</h3>

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
            Update Category
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCategory;
