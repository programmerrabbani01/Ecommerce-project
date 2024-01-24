import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllCustomersData,
  setMessageEmpty,
} from "../features/customer/userSlice.js";
import { createToaster } from "../utils/toastify.js";
import { getAllUser } from "../features/customer/userApiSlice.js";

// table data
const columns = [
  {
    title: "S.No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const title = "Customers - Digitic";

  const dispatch = useDispatch();

  const { users, error, message } = useSelector(getAllCustomersData);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const data1 = users?.map((user, index) => ({
    key: index + 1,
    name: user.firstName + " " + user.lastName,
    email: user.email,
    mobile: user.mobile,
  }));

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

      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table dataSource={data1} columns={columns} />
      </div>
    </>
  );
};

export default Customers;
