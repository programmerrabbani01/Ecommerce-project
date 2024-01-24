import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import Coupon from "../models/CouponModel.js";
import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js";
import bcrypt from "bcryptjs";
import uniqid from "uniqid";

/**
 * @desc get all users data
 * @route GET /users
 * @access PUBLIC
 */

export const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  if (users.length > 0) {
    return res.status(200).json(users);
  }

  return res.status(404).json({ message: "No Users Found" });
});

/**
 * @desc create new user
 * @route POST /users
 * @access PUBLIC
 */

export const createUser = asyncHandler(async (req, res) => {
  // get data
  const { firstName, lastName, email, password, mobile, role } = req.body;

  // check validation
  if (!firstName || !lastName || !password || !email || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // email existence
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // hash password
  const hash = await bcrypt.hash(password, 10);

  // create new user data
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hash,
    mobile,
    role,
  });

  // confirm create user

  // const successUser = await User.findById(user.id).populate("role");

  // send user access to email

  // sendMail({
  //   name,
  //   to: email,
  //   sub: "Account Access Info",
  //   msg: ` Your Account Login Access Is email: ${email} & password: ${password}`,
  // });

  // check
  if (user) {
    return res.status(201).json({ message: ` user created successful`, user });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

/**
 * @desc get Single users data
 * @route GET /users/:id
 * @access PUBLIC
 */
export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password").lean();

  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }

  res.json(user);
});

/**
 * @desc delete user data
 * @route DELETE /users/:id
 * @access PUBLIC
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(400).json({ message: "User delete failed" });
  }

  res.status(200).json({ message: "User Delete Successful", user });
});

/**
 * @desc update user data
 * @route PATCH /users/:id
 * @access PUBLIC
 */

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { firstName, lastName, email, password, mobile } = req.body;

  // validation

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // hash password
  const hash = await bcrypt.hash(password, 10);

  // update user data

  const user = await User.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      email,
      password: hash,
      mobile,
    },
    { new: true }
  );

  res.json({ message: `User updated successful`, user: user });
});

/**
 * @desc update User Status
 * @route PATCH /user/status/:id
 * @access PUBLIC
 */

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateUserStatus = await User.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `User Status Updated Successful`,
    user: updateUserStatus,
  });
});

/**
 * @desc block User
 * @route GET /user/blockUser/:id
 * @access PUBLIC
 */

export const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const block = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    {
      new: true,
    }
  );

  res.json({ message: "Block Success", block });
});

/**
 * @desc unblock User
 * @route GET /user/unBlockUser/:id
 * @access PUBLIC
 */

export const unBlockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const unBlock = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    {
      new: true,
    }
  );

  res.json({ message: "Unblock Success", unBlock });
});

/**
 * @desc get User wish kist
 * @route GET /user/wishList
 * @access PUBLIC
 */

export const getWishList = asyncHandler(async (req, res) => {
  // get value
  const loginUser = req.me;

  // find user wishlist
  const getWishlist = await User.findById(loginUser._id).populate("wishList");

  //  response
  return res.status(200).json({ getWishlist, message: "Show all wishlist" });
});

/**
 * @desc update User address
 * @route PATCH /user/address
 * @access PUBLIC
 */

export const userAddress = asyncHandler(async (req, res) => {
  // get value
  const loginUser = req.me;

  // get value from body

  const { address } = req.body;

  // validation

  if (!address) throw new Error("All fields are required");

  // update user address

  const userAddress = await User.findByIdAndUpdate(
    loginUser._id,
    {
      address: address,
    },
    { new: true }
  );

  res.json({ message: `User address updated successful`, user: userAddress });
});

/**
 * @desc  Add User cart
 * @route POST /user/cart
 * @access PUBLIC
 */

export const AddUserCart = asyncHandler(async (req, res) => {
  // get log in user

  const loginUser = req.me;

  // get id from login user

  const { _id } = loginUser;

  // get value from body

  const { cart } = req.body;

  // find user by id

  const user = await User.findById(_id);

  // check if cart already exists

  const alreadyExistsCart = await Cart.findOne({
    orderBy: user._id,
  });

  if (alreadyExistsCart) {
    // Remove the existing cart if it exists

    await Cart.findByIdAndDelete(alreadyExistsCart._id);
  }
  let products = [];

  for (let i = 0; i < cart.length; i++) {
    let getItem = {};
    getItem.product = cart[i]._id;
    getItem.count = cart[i].count;
    getItem.color = cart[i].color;

    let getPrice = await Product.findById(cart[i]._id).select("price").exec();

    getItem.price = getPrice ? getPrice.price : null;

    products.push(getItem);
  }

  let cartTotal = 0;

  for (let i = 0; i < products.length; i++) {
    cartTotal += products[i].count * products[i].price;
  }

  let newCart = await new Cart({
    products: products,
    cartTotal: cartTotal,
    orderBy: user._id.toString(),
  });

  await newCart.save();

  // response

  res.status(200).json({
    message: `User cart Created successful`,
    user: newCart,
  });
});

/**
 * @desc  get User cart
 * @route GET /user/cart
 * @access PUBLIC
 */

export const getUserCart = asyncHandler(async (req, res) => {
  // get login user value
  const loginUser = req.me;

  // login user data from database
  const carts = await Cart.findOne({ orderBy: loginUser._id }).populate(
    "products.product"
  );
  return res.status(200).json({ carts });
});

/**
 * @desc  delete User cart
 * @route DELETE /user/cart
 * @access PUBLIC
 */

export const deleteUserCart = asyncHandler(async (req, res) => {
  // get login user value
  const loginUser = req.me;

  // login user data from database

  const user = await User.findOne(loginUser._id);

  // delete user cart

  const cart = await Cart.findOneAndDelete({ orderBy: user._id });

  // response

  return res.status(200).json({ cart, message: "Remove Cart Successful" });
});

/**
 * @desc APPLY COUPON
 * @route POST /user/applyCoupon
 * @access PUBLIC
 */

export const applyCoupon = asyncHandler(async (req, res) => {
  // get coupon from body

  const { coupon } = req.body;

  // get login user

  const loginUser = req.me;

  // find user by id

  const user = await User.findOne(loginUser._id);

  // find valid coupon

  const validCoupon = await Coupon.findOne({ name: coupon });

  //  invalid coupon

  if (!validCoupon) throw new Error("Invalid coupon");

  // cart check

  const checkCart = await Cart.findOne({ orderBy: user._id });

  // if cart is empty
  if (!checkCart) throw new Error("Cart is empty");

  let { cartTotal } = await Cart.findOne({ orderBy: user._id }).populate(
    "products.product"
  );

  // total cart after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  // update

  await Cart.findOneAndUpdate({
    orderBy: user._id,
    totalAfterDiscount,
  });

  // response

  return res
    .status(200)
    .json({ totalAfterDiscount, message: "Apply Coupon Done" });
});

/**
 * @DESC Get order
 * @ROUTE api/v1/user/getOrder
 * @METHOD GET
 * @ACCESS public
 */
export const getOrders = asyncHandler(async (req, res) => {
  // get login user

  const loginUser = req.me;

  // find user by id

  const user = await User.findOne(loginUser._id);

  const userOrders = await Order.findOne({ orderBy: user._id })
    .populate("products.product")
    .populate("orderBy")
    .exec();

  res.status(200).json(userOrders);
});

/**
 * @DESC Get all users order
 * @ROUTE api/v1/user/allOrders
 * @METHOD GET
 * @ACCESS public
 */

export const getAllOrders = asyncHandler(async (req, res) => {
  const allUserOrders = await Order.find()
    .populate("products.product")
    .populate("orderBy")
    .exec();

  return res.json(allUserOrders);
});

/**
 * @DESC create order
 * @ROUTE api/v1/user/cart/cashOrder
 * @METHOD POST
 * @ACCESS public
 */

export const createOrder = asyncHandler(async (req, res) => {
  // get data from body

  const { COD, couponApplied } = req.body;

  // cash order failed validation

  if (!COD) throw new Error("Create cash order failed");

  // get login user

  const loginUser = req.me;

  // get id from login user

  const { _id } = loginUser;

  // get login user data from database

  const user = await User.findById(_id);

  // user cart

  let userCart = await Cart.findOne({ orderBy: user._id });

  //  cart empty validation

  if (!userCart) throw new Error("Cart Is Empty");

  let finalAmount = 0;

  // if couponApplied true

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount;
  } else {
    finalAmount = userCart.cartTotal;
  }

  // new order
  const newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqid(),
      method: "COD",
      amount: finalAmount,
      status: "Cash On Delivery",
      created: Date.now(),
      currency: "USD",
    },
    orderBy: user._id,
    orderStatus: "Cash On Delivery",
  });

  await newOrder.save();

  let update = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await Product.bulkWrite(update, {});

  // response

  return res.json({ message: "Order successful" });
});

/**
 * @DESC Get Single Order
 * @ROUTE api/v1/user/cash-order
 * @METHOD Post
 * @ACCESS public
 */

export const getSingleOrder = asyncHandler(async (req, res) => {
  // get login user

  const loginUser = req.me;

  // const user = await User.findById(loginUser._id);

  const userOrder = await Order.findOne({ orderby: loginUser._id })
    .populate("products.product")
    .populate("orderby");

  // response

  return res.json({ userOrder, message: "All Order Show" });
});

/**
 * @DESC Get order by user id
 * @ROUTE api/v1/user/getOrderByUserId
 * @METHOD Post
 * @ACCESS public
 */

export const getOrderUserId = asyncHandler(async (req, res) => {
  // login user

  const { _id } = req.params;

  const userOrder = await Order.findOne({ orderby: _id })
    .populate("products.product")
    .populate("orderBy");

  if (!userOrder) {
    return res.json({ message: "This User not order" });
  }
  // response
  return res.json({ userOrder, message: "User Order Show" });
});

/**
 * @DESC Update order status
 * @ROUTE api/v1/user/orderStatus/:id
 * @METHOD PUT
 * @ACCESS public
 */

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  // validation
  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }
  // update status
  const updateStatus = await Order.findByIdAndUpdate(
    id,
    {
      orderStatus: status,
      paymentIntent: { status: status },
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ updateStatus, message: "Order Status updated successfully" });
});
