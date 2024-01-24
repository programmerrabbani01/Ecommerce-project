import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createBrands } from "../features/brand/brandApiSlice.js";
import Dropzone from "react-dropzone";
import {
  getAllBrandsData,
  setMessageEmpty,
} from "../features/brand/brandSlice.js";
import { useEffect } from "react";
import { createToaster } from "../utils/toastify.js";

import { useNavigate } from "react-router-dom";

let schema = object({
  name: string().required("Name Is Required"),
});

const AddBrand = () => {
  const title = "Add Brand - Digitic";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [brandLogo, setBrandLogo] = useState([]);
  const [preview, setPreview] = useState(null);

  const { error, message, brands } = useSelector(getAllBrandsData);

  // photo preview
  const handleLogoPreview = (acceptedFiles) => {
    const selectedFiles = acceptedFiles.map((file) => {
      return {
        file: file,
        preview: URL.createObjectURL(file),
      };
    });
    setBrandLogo([...brandLogo, ...selectedFiles]);
    setPreview(selectedFiles[0].preview); // Update the preview state
  };

  // remove photo
  const handleRemoveLogo = (index) => {
    const updatedLogos = [...brandLogo];
    updatedLogos.splice(index, 1);

    if (updatedLogos.length > 0) {
      // If there are remaining logos, update the preview to the first one
      setPreview(updatedLogos[0].preview);
    } else {
      // If no logos remaining, set the preview to null
      setPreview(null);
    }

    setBrandLogo(updatedLogos);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      photo: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const form_data = new FormData();

      form_data.append("name", values.name);

      if (brandLogo && brandLogo.length > 0) {
        form_data.append("brandLogo", brandLogo[0].file);
      }

      dispatch(createBrands(form_data));

      // Reset the form after submission
      resetForm();
      setBrandLogo(null);
      setPreview(null);
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

      navigate("/brandList");
    }
  }, [dispatch, error, message, brands, navigate]);

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Add Brand</h3>

      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="error">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <CustomInput
              type="text"
              label="Enter Brand Name"
              name="name"
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              value={formik.values.name}
            />
          </div>

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

                  {/* {brandLogo && brandLogo.length > 0 && (
                    <div className="showImage d-flex flex-wrap justify-content-center">
                      <div className="uploadPictureContainer">
                        <div className="deleteImage" onClick={handleRemoveLogo}>
                          X
                        </div>
                        <img style={{ width: "100%" }} src={preview} alt="" />
                      </div>
                    </div>
                  )} */}

                  {brandLogo && brandLogo.length > 0 && (
                    <div className="showImage d-flex flex-wrap justify-content-center">
                      {brandLogo.map((logo, index) => (
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
                  )}
                </>
              )}
            </Dropzone>
          </div>
          <button
            className="btn border-0 my-3 text-white"
            style={{ backgroundColor: "#d50101" }}
            type="submit"
          >
            Add Brand
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBrand;
