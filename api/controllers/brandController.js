import asyncHandler from "express-async-handler";
import Brand from "../models/BrandModel.js";
import { createSlug } from "../helpers/createSlug.js";
import { response } from "express";
import { cloudDelete, cloudUpload } from "../utils/cloudinary.js";
import { findPublicId } from "../helpers/helpers.js";

/**
 * @description get all brands
 * @route /api/v1/brand
 * @method GET
 * @access public
 */

export const getAllBrand = asyncHandler(async (req, res) => {
  // find all brands

  const brands = await Brand.find();

  // validation for get all brands

  if (brands.length > 0) return res.status(200).json(brands);
});

/**
 * @description create a brand
 * @route /api/v1/brand
 * @method POST
 * @access public
 */

export const createBrand = asyncHandler(async (req, res) => {
  // get data from body

  const { name } = req.body;

  // name fields required validation

  if (!name) throw new Error(" Name field is require");

  // name check

  const nameCheck = await Brand.findOne({ name });

  //  name existing check

  if (nameCheck) throw new Error("This name already exists");

  // cloud Upload

  let createLogo = null;

  if (req.file) {
    const logo = await cloudUpload(req);
    createLogo = logo?.secure_url;
  }

  // create new brand

  const brand = await Brand.create({
    name,
    slug: createSlug(name),
    photo: createLogo ? createLogo : null,
  });

  //   create new brand response

  res.status(201).json({ brand, message: "Brand create successful" });
});

/**
 * @description get a single brand
 * @route /api/v1/brand/:id
 * @method GET
 * @access public
 */

export const getSingleBrand = asyncHandler(async (req, res) => {
  // get brand id from params

  const { id } = req.params;

  try {
    // find single brand by id

    const brand = await Brand.findById(id);

    //  get single brand response

    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json({ message: "Brand not found" });
  }
});

/**
 * @description delete a brand
 * @route /api/v1/brand/:id
 * @method DELETE
 * @access public
 */

export const deleteBrand = asyncHandler(async (req, res) => {
  // get brand id from params

  const { id } = req.params;

  // find brand by id and delete

  const brand = await Brand.findByIdAndDelete(id);

  // not found validation

  if (!brand) throw new Error("This Brand Is Already Delete");

  // remove photo

  if (brand.photo) {
    const publicId = findPublicId(brand.photo);

    await cloudDelete(publicId);
  }

  //  get single brand response

  res.status(200).json({ brand, message: "Brand Delete Successful" });
});

/**
 * @description update a brand
 * @route /api/v1/brand/:id
 * @method PATCH
 * @access public
 */

export const updateBrand = asyncHandler(async (req, res) => {
  // get brand id from params

  const { id } = req.params;

  // get data from body

  const { name } = req.body;

  // name require validation

  if (!name) return res.status(400).json(" Name Field is Require ");

  // brand find by id

  const brand = await Brand.findById(id);

  //  brand find by id not found validation

  if (!brand) return res.status(400).json(" Brand Is Not Found");

  // logo upload

  let updatePhoto = brand.photo;

  if (req.file) {
    const logo = await cloudUpload(req);
    updatePhoto = logo?.secure_url;

    await cloudDelete(findPublicId(brand.photo));
  }

  // update brand

  brand.name = name;
  brand.slug = createSlug(name);
  brand.photo = updatePhoto;
  brand.save();

  // brand update response

  res.status(200).json({ message: "Brand update successful", brand: brand });
});

/**
 * @description update a brand status
 * @route /api/v1/brand/status/:id
 * @method PATCH
 * @access public
 */

export const updateBrandStatus = asyncHandler(async (req, res) => {
  // get id from params

  const { id } = req.params;

  // get data from body

  const { status } = req.body;

  // update status

  const updateBrandStatus = await Brand.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  // update the status response

  res.status(200).json({
    message: "Brand StatusUpdate Successful",
    brand: updateBrandStatus,
  });
});
