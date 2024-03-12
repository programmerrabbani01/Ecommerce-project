import { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
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
import {
  getASingleProduct,
  updateProducts,
  updateSingleProductImage,
} from "../features/product/productApiSlice.js";
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
import { useNavigate, useParams } from "react-router-dom";

let schema = object({
  title: string().required("Title Is Required"),
  desc: string().required("Description Is Required"),
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

const EditProduct = () => {
  const title = "Edit Product - FLASHMART";

  const dispatch = useDispatch();

  const { brands } = useSelector(getAllBrandsData);
  const { productCategories } = useSelector(getAllProductCategoryData);
  const { colors } = useSelector(getAllColorsData);
  const { tags } = useSelector(getAllTagsData);
  const { sizes } = useSelector(getAllSizesData);

  const { id } = useParams();

  const navigate = useNavigate();

  const { error, message, loader, singleProduct } =
    useSelector(getAllProductsData);

  const [gallery, setGallery] = useState([]);

  // preview logo

  const handleLogoPreview = (e) => {
    setGallery((prevState) => [...prevState, ...e]);
  };

  // remove product photos

  const handleDeleteImage = (index) => {
    let newGallery = [...gallery];
    newGallery.splice(index, 1);
    setGallery(newGallery);
  };

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
    onSubmit: async (values) => {
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

      values.productLogo.map((item) => {
        form_data.append("productLogo", item);
      });

      dispatch(updateProducts({ id, form_data }));
    },
  });

  // get single product
  useEffect(() => {
    dispatch(getASingleProduct(id));
  }, [dispatch, id]);

  //product image deleted
  const productImageDelete = (imageId) => {
    if (imageId) {
      dispatch(updateSingleProductImage({ id: singleProduct._id, imageId }));
    }
  };

  // get all brand , productCategories , sizes and colors

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllProductCategories());
    dispatch(getAllColors());
    dispatch(getAllTag());
    dispatch(getAllSize());
  }, [dispatch]);

  //   values setup
  useEffect(() => {
    formik.values.productLogo = gallery;
  }, [gallery]);

  //   handle messages
  useEffect(() => {
    if (error) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
      if (message !== "Image Delete successfully") {
        navigate(`/products`);
      }
    }
  }, [dispatch, error, message, navigate]);

  // catch previous values
  useEffect(() => {
    if (singleProduct) {
      formik.setValues({
        ...formik.values,
        title: singleProduct?.title || "",
        desc: singleProduct?.desc || "",
        regularPrice: singleProduct?.regularPrice || "",
        salePrice: singleProduct?.salePrice || "",
        brand: singleProduct?.brand || "",
        category: singleProduct?.categories?.map((item) => item._id) || [],
        collectionName: singleProduct?.collectionName || "",
        color: singleProduct?.colors?.map((item) => item._id) || [],
        tag: singleProduct?.tags?.map((item) => item._id) || [],
        size: singleProduct?.size?.map((item) => item._id) || [],
        quantity: singleProduct?.quantity || "",
      });
    }
  }, [singleProduct, formik.setValues]);

  if (!singleProduct) {
    return <>Loading ....</>;
  }

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Edit Product</h3>

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
            <ReactQuill
              theme="snow"
              name="desc"
              // onChange={formik.handleChange("desc")}
              onChange={(value) => formik.setFieldValue("desc", value)}
              onBlur={formik.handleBlur("desc")}
              value={formik.values.desc}
            />
          </div>

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
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100 colorSelect"
            placeholder="Select Categories"
            value={formik.values.category}
            onChange={(selectedValues) =>
              formik.setFieldValue("category", selectedValues)
            }
            options={productCategories?.map((category) => ({
              value: category._id,
              label: category.name,
            }))}
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
            placeholder="Select Colors"
            value={formik.values.color}
            onChange={(selectedValues) =>
              formik.setFieldValue("color", selectedValues)
            }
            options={colors?.map((color) => ({
              value: color._id,
              label: (
                <>
                  <Badge text={color?.name} color={`${color?.colorCode}`} />
                </>
              ),
            }))}
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
            value={formik.values.tag}
            onChange={(selectedValues) =>
              formik.setFieldValue("tag", selectedValues)
            }
            options={tags?.map((tag) => ({
              value: tag._id,
              label: tag.name,
            }))}
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
            placeholder="Select Size"
            value={formik.values.size}
            onChange={(selectedValues) =>
              formik.setFieldValue("size", selectedValues)
            }
            options={sizes?.map((size) => ({
              value: size._id,
              label: size.name,
            }))}
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
                    {singleProduct?.photos?.map((logo, index) => (
                      <div key={index} className="uploadPictureContainer">
                        <div
                          className="deleteImage"
                          onClick={() => productImageDelete(logo?.public_id)}
                        >
                          X
                        </div>
                        <img style={{ width: "100%" }} src={logo?.url} alt="" />
                      </div>
                    ))}

                    {gallery.length >= 0 && (
                      <>
                        {gallery?.map((item, index) => (
                          <div key={index} className="uploadPictureContainer">
                            <div
                              className="deleteImage"
                              onClick={() => handleDeleteImage(index)}
                            >
                              X
                            </div>

                            <img
                              style={{ width: "100%" }}
                              src={URL.createObjectURL(item)}
                              alt=""
                            />
                          </div>
                        ))}
                      </>
                    )}
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
            {loader ? "Product Updating . . . ." : "Update Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
