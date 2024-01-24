import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { getAllCouponsData } from "../features/coupon/couponSlice.js";
import { getAllCoupons } from "../features/coupon/couponApiSlice.js";

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
    title: "Discount Amount",
    dataIndex: "discount",
  },
  {
    title: "Expire Date",
    dataIndex: "expire",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Coupons = () => {
  const title = "Brand List - Digitic";

  const dispatch = useDispatch();

  const { coupons } = useSelector(getAllCouponsData);

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  let tableData = [];

  if (coupons !== null) {
    const data1 = coupons?.map((coupon, index) => ({
      key: index + 1,
      name: coupon.name,
      discount: coupon.discount,
      expire: new Date(coupon.expire).toLocaleString(),

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
    }));

    tableData.push(...data1);
  }

  return (
    <>
      <MetaData title={title} />

      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table dataSource={tableData} columns={columns} />
      </div>
    </>
  );
};

export default Coupons;
