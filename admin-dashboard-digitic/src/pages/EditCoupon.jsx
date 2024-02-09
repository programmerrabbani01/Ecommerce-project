import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useFormik } from "formik";
import { date, number, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getASingleCoupon,
  updateCoupon,
} from "../features/coupon/couponApiSlice.js";

import { createToaster } from "../utils/toastify.js";
import {
  getAllCouponsData,
  setMessageEmpty,
} from "../features/coupon/couponSlice.js";
import { useNavigate, useParams } from "react-router-dom";

let schema = object({
  name: string().required("Name Is Required"),
  expire: date().required("Expire Date Is Required"),
  discount: number().required("Discount Is Required"),
});

const EditCoupon = () => {
  const title = "Edit Coupon - FLASHMART";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const { error, message, loader, singleCoupon } =
    useSelector(getAllCouponsData);

  // initial values

  const formik = useFormik({
    initialValues: {
      name: "",
      expire: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      dispatch(updateCoupon({ values, id }));
    },
  });

  useEffect(() => {
    dispatch(getASingleCoupon(id));
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
      navigate("/couponList");
    }
  }, [dispatch, error, message, navigate]);

  // set previous values

  useEffect(() => {
    if (singleCoupon) {
      const formattedExpireDate = singleCoupon.expire
        ? new Date(singleCoupon.expire).toISOString().split("T")[0]
        : "";

      formik.setValues({
        ...formik.values,
        name: singleCoupon?.name || "",
        expire: formattedExpireDate,
        discount: singleCoupon?.discount || "",
      });
    }
  }, [singleCoupon, formik.setValues]);

  if (loader) {
    return <>Loading . . . .</>;
  } else if (loader || singleCoupon == null) {
    return navigate("/couponList");
  }

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Edit Coupon</h3>

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
              label="Enter Coupon Name"
              name="name"
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              value={formik.values.name}
            />
          </div>

          <div className="error">
            {formik.touched.expire && formik.errors.expire ? (
              <div>{formik.errors.expire}</div>
            ) : null}
          </div>
          <div className="">
            <CustomInput
              type="date"
              label="Enter Expire Date"
              name="expire"
              onChange={formik.handleChange("expire")}
              onBlur={formik.handleBlur("expire")}
              value={formik.values.expire}
            />
          </div>

          <div className="error">
            {formik.touched.discount && formik.errors.discount ? (
              <div>{formik.errors.discount}</div>
            ) : null}
          </div>
          <div className="">
            <CustomInput
              type="number"
              label="Enter Discount"
              name="discount"
              onChange={formik.handleChange("discount")}
              onBlur={formik.handleBlur("discount")}
              value={formik.values.discount}
            />
          </div>

          <button
            className="btn border-0 my-3 text-white"
            style={{ backgroundColor: "#d50101" }}
            type="submit"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCoupon;
