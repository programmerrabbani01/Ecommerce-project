import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createBlogs } from "../features/blog/blogApiSlice.js";
import { getAllBlogCategory } from "../features/blogCategory/blogCategoryApiSlice.js";
import { getAllBlogsCategoryData } from "../features/blogCategory/blogCategorySlice.js";
import {
  getAllBlogsData,
  setMessageEmpty,
} from "../features/blog/blogSlice.js";
import { createToaster } from "../utils/toastify.js";

let schema = object({
  title: string().required("Title Is Required"),
  description: string().required("Description Is Required"),
  category: string().required("Category Is Required"),
});

const AddBlog = () => {
  const title = "Add Blog - FLASHMART";

  const editor = useRef(null);

  const dispatch = useDispatch();

  const [blogLogo, setBlogLogo] = useState([]);

  const { blogCategories } = useSelector(getAllBlogsCategoryData);

  const { error, message } = useSelector(getAllBlogsData);

  // preview logo

  const handleLogoPreview = (acceptedFiles) => {
    const selectedFiles = acceptedFiles.map((file) => {
      return {
        file: file,
        preview: URL.createObjectURL(file),
      };
    });
    setBlogLogo([...blogLogo, ...selectedFiles]);
  };

  // remove blog photos

  const handleRemoveLogo = (index) => {
    const updatedLogos = [...blogLogo];
    updatedLogos.splice(index, 1);
    setBlogLogo(updatedLogos);
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
    onSubmit: async (values, { resetForm }) => {
      const form_data = new FormData();

      form_data.append("title", values.title);
      form_data.append("description", values.description);
      form_data.append("category", values.category);

      values.blogLogo.forEach((logo) => {
        form_data.append(`blogLogo`, logo.file);
      });

      dispatch(createBlogs(form_data));

      // Reset the form after submission
      resetForm();
      setBlogLogo([]);
    },
  });

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
    }
  }, [dispatch, error, message]);

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Add Blog</h3>

      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="photoCard">
            <Dropzone onDrop={handleLogoPreview}>
              {({ getRootProps, getInputProps }) => (
                <>
                  <section>
                    <div className="uploadIconText">
                      <img
                        src="https://i.ibb.co/VJyrmFP/upload-Icon.png"
                        alt=""
                        className="uploadIcon"
                      />
                      <p className="addImgText">click to select files</p>
                    </div>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />

                      <button type="button" className="chooseFileButton">
                        Choose images
                      </button>
                    </div>
                  </section>
                  <div className="showImage d-flex flex-wrap justify-content-center">
                    {blogLogo?.map((logo, index) => (
                      <div key={index} className="uploadPictureContainer">
                        <div
                          className="deleteImage"
                          onClick={() => handleRemoveLogo(index)}
                        >
                          X
                        </div>
                        <img
                          style={{ width: "100%" }}
                          src={logo.preview}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </>
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
            Add Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
