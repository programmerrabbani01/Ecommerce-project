import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEnquiresData,
  setMessageEmpty,
} from "../features/enquire/enquireSlice.js";
import { useEffect } from "react";
import {
  deleteEnquire,
  getAllEnquires,
  updateEnquiryStatus,
} from "../features/enquire/enquireApiSlice.js";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
import { createToaster } from "../utils/toastify.js";
import swal from "sweetalert";

// table data
const columns = [
  {
    title: "S.No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquires = () => {
  const title = "Enquires - FLASHMART";

  const dispatch = useDispatch();

  const { enquires, error, message } = useSelector(getAllEnquiresData);

  // get all enquires data
  useEffect(() => {
    dispatch(getAllEnquires());
  }, [dispatch]);

  const data1 = [];

  if (enquires !== null) {
    for (let i = 0; i < enquires.length; i++) {
      data1.push({
        key: i + 1,
        name: enquires[i].name,
        email: enquires[i].email,
        mobile: enquires[i].mobile,
        status: (
          <>
            <select
              name=""
              defaultValue={enquires[i]?.status}
              className="form-control form-select"
              id=""
              onChange={(e) => setStatus(e.target.value, enquires[i]._id)}
            >
              <option value={enquires[i]?.status}>{enquires[i]?.status}</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </>
        ),
        date: new Date(enquires[i].createdAt).toLocaleString(),
        action: (
          <>
            <Link
              to={`/enquires/${enquires[i]?._id}`}
              className="ms-3 fs-5 text-danger"
            >
              <FaEye />
            </Link>
            <Link
              onClick={() => handleDeleteEnquiry(enquires[i]?._id)}
              className="ms-3 fs-5 text-danger"
            >
              <FaRegTrashAlt />
            </Link>
          </>
        ),
      });
    }
  }

  // delete enquiry
  const handleDeleteEnquiry = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteEnquire(id));
          // swal("Proof! Your Imaginary File Has Been Deleted", {
          //   icon: "success",
          // });
        } else {
          swal("Your Imaginary File Is Safe!");
        }
      });
    }
  };

  // set status

  const setStatus = (e, i) => {
    const data = { id: i, status: e };

    dispatch(updateEnquiryStatus(data));
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

      <h3 className="mb-4 title">Enquires</h3>
      <div>
        <Table dataSource={data1} columns={columns} />
      </div>
    </>
  );
};

export default Enquires;
