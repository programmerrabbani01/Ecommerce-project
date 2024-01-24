import Coupon from "../models/CouponModel.js";
import asyncHandler from "express-async-handler";

/**
 * @description get all coupon
 * @route /api/v1/coupon
 * @method GET
 * @access public
 */

export const getAllCoupon = asyncHandler(async (req, res) => {
  // find all coupons

  const coupons = await Coupon.find();

  //   validation for get all coupons

  if (coupons.length > 0) return res.status(200).json(coupons);


});

/**
 * @description create coupon
 * @route /api/v1/coupon
 * @method POST
 * @access public
 */

export const createCoupon = asyncHandler(async (req, res) => {
  // get data from body

  const { name, expire, discount } = req.body;

  // fields are required validation

  if (!name || !expire || !discount)
    throw new Error("All fields must be required");

  // name check

  const nameCheck = await Coupon.findOne({ name });

  //  name existing check

  if (nameCheck) return res.status(201).json("This name already exists");

  // create a new coupon

  const coupon = await Coupon.create({
    name,
    expire,
    discount,
  });

  //   response

  res.status(201).json({
    coupon,
    message: "Coupon created successful",
  });
});

/**
 * @description get single coupon by id
 * @route /api/v1/coupon/:id
 * @method GET
 * @access public
 */

export const getSingleCoupon = asyncHandler(async (req, res) => {
  // get id of coupon from params

  const { id } = req.params;

  // find coupon by id

  const coupon = await Coupon.findById(id);

  // not found validation

  if (!coupon) throw new Error("Coupon not found");

  //  get single coupon response

  res.status(200).json({ coupon });
});

/**
 * @description delete coupon by id
 * @route /api/v1/coupon/:id
 * @method DELETE
 * @access public
 */

export const deleteCoupon = asyncHandler(async (req, res) => {
  // get id of coupon from params

  const { id } = req.params;

  // find coupon by id and delete

  const coupon = await Coupon.findByIdAndDelete(id);

  // not found validation

  if (!coupon) throw new Error("This Coupon Is Already Delete");

  //  get single coupon response

  res.status(200).json({ coupon, message: "Coupon deleted successful" });
});

/**
 * @description UPDATE coupon by id
 * @route /api/v1/coupon/:id
 * @method PATCH
 * @access public
 */

export const updateCoupon = asyncHandler(async (req, res) => {
  // get id of coupon from params

  const { id } = req.params;

  // get data from body

  const { name, expire, discount } = req.body;

  // fields are required validation

  if (!name || !expire || !discount)
    throw new Error("All fields must be required");

  // find coupon by id

  const coupon = await Coupon.findById(id);

  // not found validation

  if (!coupon) throw new Error("Coupon not found");

  // update coupon

  const updatedCoupon = await Coupon.findByIdAndUpdate(
    id,
    {
      name,
      expire,
      discount,
    },
    {
      new: true,
    }
  );

  //  update coupon response

  res.status(200).json({
    coupon: updatedCoupon,
    message: "Coupon updated successful",
  });
});

/**
 * @description UPDATE coupon status by id
 * @route /api/v1/coupon/status/:id
 * @method PATCH
 * @access public
 */

export const updateCouponStatus = asyncHandler(async (req, res) => {
  // get id of coupon from params

  const { id } = req.params;

  //   get data from body

  const { status } = req.body;

  //   update coupon status

  const updateCouponStatus = await Coupon.findByIdAndUpdate(
    id,
    { status: status },
    { new: true }
  );

  //  get single coupon response

  res.status(200).json({
    coupon: updateCouponStatus,
    message: "Coupon Status Update successful",
  });
});
