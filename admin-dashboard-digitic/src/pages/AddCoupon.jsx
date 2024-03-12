import CustomInput from "../components/CustomInput/CustomInput.jsx";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useFormik } from "formik";
import { date, number, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createCoupons } from "../features/coupon/couponApiSlice.js";

import { createToaster } from "../utils/toastify.js";
import {
  getAllCouponsData,
  setMessageEmpty,
} from "../features/coupon/couponSlice.js";

let schema = object({
  name: string().required("Name Is Required"),
  expire: date().required("Expire Date Is Required"),
  discount: number().required("Discount Is Required"),
});

const AddCoupon = () => {
  const title = "Add Coupon - FLASHMART";

  const dispatch = useDispatch();
  
  const { error, message } = useSelector(getAllCouponsData);

  // initial values

  const formik = useFormik({
    initialValues: {
      name: "",
      expire: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {

      dispatch(createCoupons(values));
      // Reset the form after submission
      resetForm();
    },
  });

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

      <h3 className="mb-4 title">Add Coupon</h3>

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

export default AddCoupon;
