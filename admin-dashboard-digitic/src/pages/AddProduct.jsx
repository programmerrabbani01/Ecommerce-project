import { useEffect, useRef, useState } from "react";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import JoditEditor from "jodit-react";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../features/brand/brandApiSlice.js";
import { getAllBrandsData } from "../features/brand/brandSlice.js";
import { getAllProductCategoryData } from "../features/productCategory/pCategorySlice.js";
import { getAllProductCategories } from "../features/productCategory/pCategoryApiSlice.js";
import { getAllColorsData } from "../features/color/colorSlice.js";
import { getAllColors } from "../features/color/colorApiSlice.js";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { createProducts } from "../features/product/productApiSlice.js";
import { getAllTagsData } from "../features/tag/tagSlice.js";
import { getAllTag } from "../features/tag/tagApiSlice.js";
import { createToaster } from "../utils/toastify.js";
import {
  getAllProductsData,
  setMessageEmpty,
} from "../features/product/productSlice.js";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

let schema = object({
  title: string().required("Title Is Required"),
  desc: string().required("Description Is Required"),
  price: number().required("price Is Required"),
  quantity: number().required("Quantity Is Required"),
  brand: string().required("Brand Is Required"),
  categories: string().required("Category Is Required"),
  collectionName: string().required("CollectionName Is Required"),
  color: array()
    .min(1, "Pick at least one color")
    .required("Color Is Required"),
  tag: array().min(1, "Pick at least one tag").required("Tag Is Required"),
});

const AddProduct = () => {
  const title = "Add Product - Digitic";

  // const editor = useRef(null);
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const [tag, setTag] = useState([]);
  const [productLogo, setProductLogo] = useState([]);

  const { brands } = useSelector(getAllBrandsData);
  const { productCategories } = useSelector(getAllProductCategoryData);
  const { colors } = useSelector(getAllColorsData);
  const { tags } = useSelector(getAllTagsData);

  const { error, message, loader } = useSelector(getAllProductsData);

  // initial values

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      price: "",
      brand: "",
      categories: "",
      collectionName: "",
      color: [],
      tag: [],
      quantity: "",
      productLogo: [],
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const form_data = new FormData();

      form_data.append("title", values.title);
      form_data.append("desc", values.desc);
      form_data.append("price", values.price);
      form_data.append("brand", values.brand);
      form_data.append("categories", values.categories);
      form_data.append("collectionName", values.collectionName);
      form_data.append("colors", JSON.stringify(values.color));
      form_data.append("tags", JSON.stringify(values.tag));
      form_data.append("quantity", values.quantity);

      values.productLogo.forEach((logo) => {
        form_data.append(`productLogo`, logo.file);
      });

      dispatch(createProducts(form_data));

      // Reset the form after submission
      resetForm();
      setProductLogo([]);
      setColor([]);
      setTag([]);
    },
  });

  // preview logo

  const handleLogoPreview = (acceptedFiles) => {
    const selectedFiles = acceptedFiles.map((file) => {
      return {
        file: file,
        preview: URL.createObjectURL(file),
      };
    });
    setProductLogo([...productLogo, ...selectedFiles]);
  };

  // remove product photos

  const handleRemoveLogo = (index) => {
    const updatedLogos = [...productLogo];
    updatedLogos.splice(index, 1);
    setProductLogo(updatedLogos);
  };

  //  color

  const getColor = [];

  colors?.forEach((i) => {
    getColor.push({
      label: i.name,
      value: i._id,
    });
  });

  // handle Colors

  const handleColors = (selectedColors) => {
    setColor(selectedColors);
  };

  //  tag

  const getTag = tags?.map((i) => ({
    label: i.name,
    value: i._id,
  }));

  // handle Colors

  const handleTags = (selectedTags) => {
    setTag(selectedTags);
  };

  // get all brand , productCategories and colors

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllProductCategories());
    dispatch(getAllColors());
    dispatch(getAllTag());
  }, [dispatch]);

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.tag = tag ? tag : " ";
    formik.values.productLogo = productLogo;
  }, [color, productLogo, tag]);

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

      <h3 className="mb-4 title">Add Products</h3>

      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="error">
            {formik.touched.desc && formik.errors.desc ? (
              <div>{formik.errors.desc}</div>
            ) : null}
          </div>
          <div className="mb-4">
            {/* <JoditEditor
              ref={editor}
              tabIndex={1}
              name="desc"
              onChange={formik.handleChange("desc")}
              onBlur={formik.handleBlur("desc")}
              value={formik.values.desc}
            /> */}

            <ReactQuill
              theme="snow"
              name="desc"
              onChange={formik.handleChange("desc")}
              onBlur={formik.handleBlur("desc")}
              value={formik.values.desc}
            />
          </div>
          <div className="error">
            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            label="Enter Product price"
            name="price"
            onChange={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
            value={formik.values.price}
          />
          <div className="error">
            {formik.touched.brand && formik.errors.brand ? (
              <div>{formik.errors.brand}</div>
            ) : null}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control mb-4 py-3"
          >
            <option value="">Select Brand</option>
            {brands?.map((brand, index) => {
              return (
                <option key={index} value={brand.name}>
                  {brand.name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.categories && formik.errors.categories ? (
              <div>{formik.errors.categories}</div>
            ) : null}
          </div>
          <select
            name="categories"
            onChange={formik.handleChange("categories")}
            onBlur={formik.handleBlur("categories")}
            value={formik.values.categories}
            className="form-control mb-4 py-3"
          >
            <option value="">Select Category</option>
            {productCategories?.map((category, index) => {
              return (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.color && formik.errors.color ? (
              <div>{formik.errors.color}</div>
            ) : null}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100 colorSelect"
            placeholder="Select colors"
            value={color}
            onChange={handleColors}
            options={getColor}
          />

          <div className="error">
            {formik.touched.tag && formik.errors.tag ? (
              <div>{formik.errors.tag}</div>
            ) : null}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100 colorSelect"
            placeholder="Select Tags"
            value={tag}
            onChange={handleTags}
            options={getTag}
          />
          

          <div className="error">
            {formik.touched.collectionName && formik.errors.collectionName ? (
              <div>{formik.errors.collectionName}</div>
            ) : null}
          </div>

          <Select
            allowClear
            className="w-100 colorSelect"
            placeholder="Select CollectionName"
            name="collectionName"
            onChange={(selectedValues) =>
              formik.setFieldValue("collectionName", selectedValues)
            }
            onBlur={formik.handleBlur("collectionName")}
            value={formik.values.collectionName}
            options={[
              {
                value: "featured",
                label: "Featured",
              },
              {
                value: "special",
                label: "Special",
              },
              {
                value: "popular",
                label: "Popular",
              },
            ]}
          />

          <div className="error">
            {formik.touched.quantity && formik.errors.quantity ? (
              <div>{formik.errors.quantity}</div>
            ) : null}
          </div>

          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
            value={formik.values.quantity}
          />

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
                    {productLogo?.map((logo, index) => (
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

          <button
            className="btn border-0 my-3 text-white"
            type="submit"
            style={{ backgroundColor: "#d50101" }}
          >
            {loader ? "Product Creating . . . ." : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
