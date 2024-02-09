import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  getAllCouponsData,
  setMessageEmpty,
} from "../features/coupon/couponSlice.js";
import {
  deleteCoupon,
  getAllCoupons,
} from "../features/coupon/couponApiSlice.js";
import swal from "sweetalert";
import { createToaster } from "../utils/toastify.js";

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
  const title = "Coupon List - FLASHMART";

  const dispatch = useDispatch();

  const { coupons, error, message } = useSelector(getAllCouponsData);

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  let tableData = [];

  if (coupons ?? null) {
    const data1 = coupons?.map((coupon, index) => ({
      key: index + 1,
      name: coupon.name,
      discount: coupon.discount + "%",
      expire: new Date(coupon.expire).toLocaleString(),

      action: (
        <>
          <Link to={`/coupon/${coupon?._id}`} className=" fs-5 text-danger">
            <FaEdit />
          </Link>
          <Link
            onClick={() => handleDeleteACoupon(coupon?._id)}
            className="ms-3 fs-5 text-danger"
          >
            <FaRegTrashAlt />
          </Link>
        </>
      ),
    }));

    tableData.push(...data1);
  }

  // delete coupon
  const handleDeleteACoupon = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteCoupon(id));
          // swal("Proof! Your Imaginary File Has Been Deleted", {
          //   icon: "success",
          // });
        } else {
          swal("Your Imaginary File Is Safe!");
        }
      });
    }
  };

  // messages

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

      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table dataSource={tableData} columns={columns} />
      </div>
    </>
  );
};

export default Coupons;
