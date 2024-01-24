import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useEffect } from "react";
import { createToaster } from "../utils/toastify.js";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllTagsData, setMessageEmpty } from "../features/tag/tagSlice.js";
import { getSingleTag, updateTagApi } from "../features/tag/tagApiSlice.js";
import { useNavigate, useParams } from "react-router-dom";

let schema = object({
  name: string().required("Name Is Required"),
});

const EditTag = () => {
  const title = "Add Tag - Digitic";

  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();

  const { error, message, singleTag, loader } = useSelector(getAllTagsData);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      dispatch(updateTagApi({ values, id }));
    },
  });

  //   get single tag

  useEffect(() => {
    dispatch(getSingleTag(id));
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
      navigate("/tagList");
    }
  }, [dispatch, error, message, navigate]);

  useEffect(() => {
    // Check if singleTag is not null before setting form values
    if (singleTag) {
      formik.setValues({
        ...formik.values,
        name: singleTag.name || "",
      });
    }
  }, [singleTag, formik.setValues]);

  if (loader) {
    return <>Loading ....</>;
  } else if (loader || singleTag == null) {
    return navigate("/tagList");
  }

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Edit Tag</h3>

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
            Update Tag
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTag;
