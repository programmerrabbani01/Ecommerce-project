import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersData } from "../features/order/orderSlice.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { getAllOrders } from "../features/order/orderApiSlice.js";

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
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
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

const Orders = () => {
  const title = "Orders - Digitic";

  const dispatch = useDispatch();

  const { orders } = useSelector(getAllOrdersData);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const data1 = [];

  if (orders !== null) {
    for (let i = 0; i < orders.length; i++) {
      data1.push({
        key: i + 1,
        name: orders[i].orderBy.firstName + " " + orders[i].orderBy.lastName,
        product: orders[i].products.map((i, index) => {
          return (
            <ul
              style={{ listStyle: "none", margin: "0px", padding: "0px" }}
              key={index}
            >
              <li>{i.product?.title}</li>
            </ul>
          );
        }),
        amount: orders[i].paymentIntent.amount,
        date: new Date(orders[i].createdAt).toLocaleString(),
        action: (
          <>
            <Link to="" className=" fs-5 text-danger">
              <FaEdit />
            </Link>
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

      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table dataSource={data1} columns={columns} />
      </div>
    </>
  );
};

export default Orders;
