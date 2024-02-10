import asyncHandler from "express-async-handler";
import Enq from "../models/EnqModal.js";

/**
 * @description get all enquires
 * @route /api/v1/enquire
 * @method GET
 * @access public
 */

export const getAllEnquires = asyncHandler(async (req, res) => {
  // find all brands

  const enquires = await Enq.find();

  // validation for get all enquires

  if (enquires.length > 0) return res.status(200).json(enquires);

  //   not found response

  res.status(404).json({ message: "Enquires Are Not Found" });
});

/**
 * @description create a enquire
 * @route /api/v1/enquire
 * @method POST
 * @access public
 */

export const createEnquire = asyncHandler(async (req, res) => {
  // get data from body

  const { name, email, mobile, comment, status } = req.body;

  // name fields required validation

  if (!name || !email || !mobile || !comment)
    throw new Error(" Name field is require");

  // name check

  const nameCheck = await Enq.findOne({ name });

  //  name existing check

  if (nameCheck) throw new Error("This name already exists");

  // create new Enquire

  const enquire = await Enq.create({
    name,
    email,
    mobile,
    comment,
    status,
  });

  //   create new Enquire response

  res.status(201).json({ enquire, message: "Enquire create successful" });
});

/**
 * @description get a single Enquire
 * @route /api/v1/enquire/:id
 * @method GET
 * @access public
 */

export const getSingleEnquire = asyncHandler(async (req, res) => {
  // get Enquire id from params

  const { id } = req.params;

  try {
    // find single Enquire by id

    const enquire = await Enq.findById(id);

    //  get single Enquire response

    res.status(200).json(enquire);
  } catch (error) {
    res.status(400).json({ message: "Enquire not found" });
  }
});

/**
 * @description delete a Enquire
 * @route /api/v1/enquire/:id
 * @method DELETE
 * @access public
 */

export const deleteEnquire = asyncHandler(async (req, res) => {
  // get Enquire id from params

  const { id } = req.params;

  // find Enquire by id and delete

  const enquire = await Enq.findByIdAndDelete(id);

  // not found validation

  if (!enquire) throw new Error("This Enquire Is Already Delete");

  //  get single Enquire response

  res.status(200).json({ enquire, message: "Enquire Delete Successful" });
});

/**
 * @description update a enquire
 * @route /api/v1/enquire/:id
 * @method PATCH
 * @access public
 */

export const updateEnquire = asyncHandler(async (req, res) => {
  // get enquire id from params

  const { id } = req.params;

  // get data from body

  const { name, email, mobile, comment } = req.body;

  // name require validation

  if (!name || !email || !mobile || !comment)
    throw new Error(" Name Field is Require ");

  // enquire find by id

  const enquire = await Enq.findById(id);

  //  enquire find by id not found validation

  if (!enquire) throw new Error(" enquire Is Not Found");

  // update enquire

  enquire.name = name;
  enquire.email = email;
  enquire.mobile = mobile;
  enquire.comment = comment;
  enquire.save();

  // enquire update response

  res.status(200).json({ message: "enquire update successful", enquire });
});

/**
 * @description update a enquire status
 * @route /api/v1/enquire/status/:id
 * @method PATCH
 * @access public
 */

export const updateEnqStatus = asyncHandler(async (req, res) => {
  // get enquire id from params

  const { id } = req.params;

  // get data from body

  const { status } = req.body;

  // update status

  const updateEnqStatus = await Enq.findByIdAndUpdate(
    id,
    {
      status: status,
    },
    {
      new: true,
    }
  );

  // update the status response

  res.status(200).json({
    message: "Enquiry StatusUpdate Successful",
    enquiry: updateEnqStatus,
  });
});
