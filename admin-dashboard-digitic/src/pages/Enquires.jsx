import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllEnquiresData } from "../features/enquire/enquireSlice.js";
import { useEffect } from "react";
import { getAllEnquires } from "../features/enquire/enquireApiSlice.js";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

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
  const title = "Enquires - Digitic";

  const dispatch = useDispatch();

  const { enquires } = useSelector(getAllEnquiresData);

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
            <select name="" id="" className="form-control form-select">
              <option value="">Set Status</option>
            </select>
          </>
        ),
        date: enquires[i].createdAt,
        action: (
          <>
            <Link to="" className="ms-3 fs-5 text-danger">
              <FaRegTrashAlt />
            </Link>
          </>
        ),
      });
    }
  }

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
