import { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
// import JoditEditor from "jodit-react";
import { useFormik } from "formik";
import { array, number, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../features/brand/brandApiSlice.js";
import { getAllBrandsData } from "../features/brand/brandSlice.js";
import { getAllProductCategoryData } from "../features/productCategory/pCategorySlice.js";
import { getAllProductCategories } from "../features/productCategory/pCategoryApiSlice.js";
import { getAllColorsData } from "../features/color/colorSlice.js";
import { getAllColors } from "../features/color/colorApiSlice.js";
import { Badge, Select } from "antd";
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
import { getAllSizesData } from "../features/size/sizeSlice.js";
import { getAllSize } from "../features/size/sizeApiSlice.js";

let schema = object({
  title: string().required("Title Is Required"),
  desc: string().required("Description Is Required"),
  // regularPrice: number().required("Regular Price Is Required"),
  salePrice: number().required("Sale Price Is Required"),
  quantity: number().required("Quantity Is Required"),
  brand: string().required("Brand Is Required"),
  category: array()
    .min(1, "Pick at least one category")
    .required("Category Is Required"),
  collectionName: string().required("CollectionName Is Required"),
  color: array()
    .min(1, "Pick at least one color")
    .required("Color Is Required"),
  tag: array().min(1, "Pick at least one tag").required("Tag Is Required"),
  size: array().min(1, "Pick at least one size").required("Size Is Required"),
});

const AddProduct = () => {
  const title = "Add Product - FLASHMART";

  // const editor = useRef(null);
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const [tag, setTag] = useState([]);
  const [size, setSize] = useState([]);
  const [category, setCategory] = useState([]);
  const [productLogo, setProductLogo] = useState([]);

  const { brands } = useSelector(getAllBrandsData);
  // const { productCategories } = useSelector(getAllProductCategoryData);
  const { colors } = useSelector(getAllColorsData);
  const { tags } = useSelector(getAllTagsData);
  const { sizes } = useSelector(getAllSizesData);
  const { productCategories } = useSelector(getAllProductCategoryData);

  const { error, message, loader } = useSelector(getAllProductsData);

  // initial values

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      regularPrice: "",
      salePrice: "",
      brand: "",
      category: [],
      collectionName: null,
      color: [],
      tag: [],
      size: [],
      quantity: "",
      productLogo: [],
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const form_data = new FormData();

      form_data.append("title", values.title);
      form_data.append("desc", values.desc);
      form_data.append("regularPrice", values.regularPrice);
      form_data.append("salePrice", values.salePrice);
      form_data.append("brand", values.brand);
      form_data.append("categories", JSON.stringify(values.category));
      form_data.append("collectionName", values.collectionName);
      form_data.append("colors", JSON.stringify(values.color));
      form_data.append("tags", JSON.stringify(values.tag));
      form_data.append("size", JSON.stringify(values.size));
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
      setSize([]);
      setCategory([]);
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
      label: <>
      <Badge text={i?.name} color={`${i?.colorCode}`} />
      </>,
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

  // handle Tags

  const handleTags = (selectedTags) => {
    setTag(selectedTags);
  };

  //  size

  const getSize = sizes?.map((i) => ({
    label: i.name,
    value: i._id,
  }));

  // handle size

  const handleSizes = (selectedSizes) => {
    setSize(selectedSizes);
  };

  //  size

  const getCategory = productCategories?.map((i) => ({
    label: i.name,
    value: i._id,
  }));

  // handle size

  const handleCategories = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  // get all brand , productCategories and colors

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllProductCategories());
    dispatch(getAllColors());
    dispatch(getAllTag());
    dispatch(getAllSize());
    dispatch(getAllProductCategories());
  }, [dispatch]);

  useEffect(() => {
    formik.values.color = color;
    formik.values.tag = tag;
    formik.values.size = size;
    formik.values.category = category;
    formik.values.productLogo = productLogo;
  }, [color, productLogo, tag, size, category]);

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

          {/* <div className="error">
            {formik.touched.regularPrice && formik.errors.regularPrice ? (
              <div>{formik.errors.regularPrice}</div>
            ) : null}
          </div> */}
          <CustomInput
            type="number"
            label="Enter Product Regular Price"
            name="regularPrice"
            onChange={formik.handleChange("regularPrice")}
            onBlur={formik.handleBlur("regularPrice")}
            value={formik.values.regularPrice}
          />

          <div className="error">
            {formik.touched.salePrice && formik.errors.salePrice ? (
              <div>{formik.errors.salePrice}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Sale Price"
            name="salePrice"
            onChange={formik.handleChange("salePrice")}
            onBlur={formik.handleBlur("salePrice")}
            value={formik.values.salePrice}
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

          <Select
            mode="multiple"
            allowClear
            className="w-100 colorSelect"
            placeholder="Select Categories"
            value={category}
            onChange={handleCategories}
            options={getCategory}
          />

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
            {formik.touched.size && formik.errors.size ? (
              <div>{formik.errors.size}</div>
            ) : null}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100 colorSelect"
            placeholder="Select Sizes"
            value={size}
            onChange={handleSizes}
            options={getSize}
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
