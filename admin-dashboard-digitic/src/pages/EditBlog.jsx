import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getASingleBlog, updateBlog } from "../features/blog/blogApiSlice.js";
import { getAllBlogCategory } from "../features/blogCategory/blogCategoryApiSlice.js";
import { getAllBlogsCategoryData } from "../features/blogCategory/blogCategorySlice.js";
import {
  getAllBlogsData,
  setMessageEmpty,
} from "../features/blog/blogSlice.js";
import { createToaster } from "../utils/toastify.js";
import { useNavigate, useParams } from "react-router-dom";

let schema = object({
  title: string().required("Title Is Required"),
  description: string().required("Description Is Required"),
  category: string().required("Category Is Required"),
});
const EditBlog = () => {
  const title = "Edit Blog - Digitic";

  const editor = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const { id } = useParams();

  // const [blogLogo, setBlogLogo] = useState([]);

  const { blogCategories } = useSelector(getAllBlogsCategoryData);

  const { error, message, loader, singleBlog } = useSelector(getAllBlogsData);

  console.log(singleBlog);

  // Initialize brandLogo using newBrands

  const [blogLogo, setBlogLogo] = useState(
    singleBlog?.image ? [{ file: null, preview: singleBlog.image }] : []
  );

  // photo preview

  const handleLogoPreview = (acceptedFiles) => {
    const selectedFiles = acceptedFiles.map((file) => ({
      file: file,
      preview: URL.createObjectURL(file),
    }));
    setBlogLogo(selectedFiles);
    setPreview(selectedFiles[0].preview);
  };

  // remove photo

  const handleRemoveLogo = (index) => {
    const updatedLogos = [...blogLogo];
    updatedLogos.splice(index, 1);
    setBlogLogo(updatedLogos);
    setPreview(updatedLogos.length > 0 ? updatedLogos[0].preview : null);
  };

  // initial values

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      image: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const form_data = new FormData();

      form_data.append("title", values.title);
      form_data.append("description", values.description);
      form_data.append("category", values.category);

      if (blogLogo && blogLogo.length > 0) {
        form_data.append("blogLogo", blogLogo[0].file);
      }

      dispatch(updateBlog({ id, form_data }));
    },
  });

  // get single brands
  useEffect(() => {
    dispatch(getASingleBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, [dispatch]);

  useEffect(() => {
    formik.values.blogLogo = blogLogo;
  }, [blogLogo]);

  // handle messages

  useEffect(() => {
    if (error) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
      navigate("/blogList");
    }
  }, [dispatch, error, message]);

  // get previous values

  useEffect(() => {
    // Check if singleBrand is not null before setting brandLogo
    if (singleBlog) {
      setBlogLogo(
        singleBlog.image ? [{ file: null, preview: singleBlog.image }] : []
      );

      formik.setValues({
        ...formik.values,
        title: singleBlog.title || "",
        category: singleBlog.category || "",
        description: singleBlog.description || "",
      });
    }
  }, [singleBlog, formik.setValues]);

  if (loader) {
    return <>Loading ....</>;
  } else if (loader || singleBlog == null) {
    return navigate("/blogList");
  }

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Edit Blog</h3>

      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="photoCard">
            <Dropzone
              onDrop={(acceptedFiles) => handleLogoPreview(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div>
                  <section>
                    <div {...getRootProps()} className="uploadIconText">
                      <input {...getInputProps()} accept="image/*" />
                      <img
                        src="https://i.ibb.co/VJyrmFP/upload-Icon.png"
                        alt=""
                        className="uploadIcon"
                      />
                      <p className="addImgText">Click to select files</p>
                    </div>
                  </section>
                  {(blogLogo.length > 0 || singleBlog.length > 0) && (
                    <div className="showImage d-flex flex-wrap justify-content-center">
                      <div className="uploadPictureContainer">
                        <div
                          className="deleteImage"
                          onClick={() => handleRemoveLogo(0)}
                        >
                          X
                        </div>
                        <img
                          style={{ width: "100%" }}
                          src={preview ?? blogLogo[0]?.preview ?? ""}
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
          </div>

          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="">
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              value={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>
          <select
            id=""
            className="form-control mb-4 py-3"
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option value="">Select Blog Category</option>
            {blogCategories?.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <div className="error">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <JoditEditor
              ref={editor}
              tabIndex={1}
              name="description"
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              value={formik.values.description}
            />
          </div>
          <button
            className="btn border-0 my-3 text-white"
            style={{ backgroundColor: "#d50101" }}
            type="submit"
          >
            Update Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
