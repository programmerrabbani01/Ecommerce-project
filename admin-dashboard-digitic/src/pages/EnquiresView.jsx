import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleEnquiry,
  updateEnquiryStatus,
} from "../features/enquire/enquireApiSlice.js";
import {
  getAllEnquiresData,
  setMessageEmpty,
} from "../features/enquire/enquireSlice.js";
import { IoMdArrowBack } from "react-icons/io";
import { createToaster } from "../utils/toastify.js";

const EnquiresView = () => {
  const title = "View Enquires - FLASHMART";

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, message, singleEnquiry } = useSelector(getAllEnquiresData);

  // Local state to store the updated status
  const [updatedStatus, setUpdatedStatus] = useState("");

  //   get single enquiry

  useEffect(() => {
    dispatch(getSingleEnquiry(id));
  }, [dispatch, id]);

  // go back to the previous
  const goBack = () => {
    navigate("/enquires");
  };

  // Update updatedStatus on mount
  useEffect(() => {
    setUpdatedStatus(singleEnquiry?.status);
  }, [singleEnquiry?.status]);

  // set status

  const setStatus = (e, i) => {
    const data = { id: i, status: e };

    dispatch(updateEnquiryStatus(data));

    // Update local state immediately

    setUpdatedStatus(e);
  };

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

      <div className="d-flex align-items-center justify-content-between ">
        <h3 className="mb-0 title">View Enquires</h3>
        <button
          className="border-0 fs-6"
          style={{
            backgroundColor: "#d50101",
            color: "#ffffff",
            padding: " 5px 10px",
            borderRadius: "5px",
          }}
          onClick={goBack}
        >
          <IoMdArrowBack className="fs-6" style={{ marginBottom: "3px" }} /> Go
          Back
        </button>
      </div>

      <div className="mt-5 bg-white p-4 d-flex flex-column gap-3 rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{singleEnquiry?.name}</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:${singleEnquiry?.email}`}>
              {singleEnquiry?.email}
            </a>
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+88${singleEnquiry?.mobile}`}>
              {singleEnquiry?.mobile}
            </a>
          </p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{singleEnquiry?.comment}</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{updatedStatus}</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              defaultValue={updatedStatus}
              className="form-control form-select"
              id=""
              onChange={(e) => setStatus(e.target.value, id)}
            >
              <option value={singleEnquiry?.status}>
                {singleEnquiry?.status}
              </option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquiresView;
