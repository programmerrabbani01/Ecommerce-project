import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getAllBrandsData,
  setMessageEmpty,
} from "../features/brand/brandSlice.js";
import {
  getASingleBrand,
  updateBrand,
} from "../features/brand/brandApiSlice.js";
import { createToaster } from "../utils/toastify.js";

let schema = object({
  name: string().required("Name Is Required"),
});

const EditBrand = () => {
  const title = "Edit Brand - Digitic";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const { id } = useParams();

  const { error, message, loader, singleBrand } = useSelector(getAllBrandsData);

  // Initialize brandLogo using newBrands

  const [brandLogo, setBrandLogo] = useState(
    singleBrand?.photo ? [{ file: null, preview: singleBrand.photo }] : []
  );

  // photo preview

  const handleLogoPreview = (acceptedFiles) => {
    const selectedFiles = acceptedFiles.map((file) => ({
      file: file,
      preview: URL.createObjectURL(file),
    }));
    setBrandLogo(selectedFiles);
    setPreview(selectedFiles[0].preview);
  };

  // remove photo

  const handleRemoveLogo = (index) => {
    const updatedLogos = [...brandLogo];
    updatedLogos.splice(index, 1);
    setBrandLogo(updatedLogos);
    setPreview(updatedLogos.length > 0 ? updatedLogos[0].preview : null);
  };

  // console.log(singleBrand[0]?.name);

  const formik = useFormik({
    initialValues: {
      name: "",
      photo: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const form_data = new FormData();

      form_data.append("name", values.name);

      if (brandLogo && brandLogo.length > 0) {
        form_data.append("brandLogo", brandLogo[0].file);
      }

      dispatch(updateBrand({ id, form_data }));

      // Reset the form after submission
    },
  });

  // get all brands
  useEffect(() => {
    dispatch(getASingleBrand(id));
  }, [dispatch, id]);

  // message handlers
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
  }, [dispatch, error, message, navigate]);

  useEffect(() => {
    // Check if singleBrand is not null before setting brandLogo
    if (singleBrand) {
      setBrandLogo(
        singleBrand.photo ? [{ file: null, preview: singleBrand.photo }] : []
      );

      formik.setValues({
        ...formik.values,
        name: singleBrand.name || "",
      });
    }
  }, [singleBrand, formik.setValues]);

  if (loader) {
    return <>Loading ....</>;
  } else if (loader || singleBrand == null) {
    return navigate("/brandList");
  }

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Edit Brand</h3>

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
                  {(brandLogo.length > 0 || singleBrand.length > 0) && (
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
                          src={preview ?? brandLogo[0]?.preview ?? ""}
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <button
            className="btn border-0 my-3 text-white"
            style={{ backgroundColor: "#d50101" }}
            type="submit"
          >
            Update Brand
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBrand;
