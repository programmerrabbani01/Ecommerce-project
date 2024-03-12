// OrderView.jsx

import { Table, Spin } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { getAllUserOrdersById } from "../features/order/orderApiSlice.js";
import { getAllOrdersData } from "../features/order/orderSlice.js";
import { IoMdArrowBack } from "react-icons/io";

const columns = [
  {
    title: "S.No",
    dataIndex: "key",
  },
  {
    title: "Photo",
    dataIndex: "photos",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  // {
  //   title: "Color",
  //   dataIndex: "color",
  // },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Price",
    dataIndex: "amount",
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
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

const OrderView = () => {
  const title = "View User Orders - FLASHMART";
  const dispatch = useDispatch();
  const { id } = useParams();

  const { orders, loader } = useSelector(getAllOrdersData);

  const navigate = useNavigate();

  console.log(orders);

  useEffect(() => {
    dispatch(getAllUserOrdersById(id));
  }, [dispatch, id]);

  let tableData = [];

  // if (orders?.products?.length > 0) {
  //   const data = orders?.products?.map((item, index) => ({
  //     key: index + 1,
  //     photos: (
  //       <>
  //         {Array.isArray(item?.product?.photos) && item?.product?.photos[0] && (
  //           <img
  //             className="productImage"
  //             src={item?.product?.photos[0]}
  //             alt=""
  //           />
  //         )}
  //       </>
  //     ),
  //     productName: item?.product?.title,
  //     brand: item?.product?.brand,
  //     color: item?.color?.name,
  //     count: item?.count,
  //     amount: item?.product?.salePrice,
  //     totalAmount: item.count * item.product.salePrice,
  //     date: new Date(item?.product?.createdAt).toLocaleString(),
  //     action: (
  //       <>
  //         <Link to="" className=" fs-5 text-danger">
  //           <FaEdit />
  //         </Link>
  //         <Link to="" className="ms-3 fs-5 text-danger">
  //           <FaRegTrashAlt />
  //         </Link>
  //       </>
  //     ),
  //   }));

  //   tableData.push(...data);
  // }

  if (orders?.products?.length > 0) {
    const data = orders?.products?.map((item, index) => {
      const date = new Date(item?.product?.createdAt);
      const formattedDate = `${
        date.getMonth() + 1
      }/${date.getDate()}/${date.getFullYear()}`;
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        key: index + 1,
        photos: (
          <>
            {Array.isArray(item?.product?.photos) &&
              item?.product?.photos[0] && (
                <img
                  className="productImage"
                  src={item?.product?.photos[0]}
                  alt=""
                />
              )}
          </>
        ),
        productName: item?.product?.title,
        brand: item?.product?.brand,
        // color: item?.color?.name,
        count: item?.count,
        amount: item?.product?.salePrice,
        totalAmount: item.count * item.product.salePrice,
        date: (
          <>
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </>
        ),
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
      };
    });

    tableData.push(...data);
  }

  if (loader) {
    return <>Loading...</>;
  }

  // go back to the previous
  const goBack = () => {
    navigate("/orders");
  };

  return (
    <>
      <MetaData title={title} />

      <div className="d-flex align-items-center justify-content-between ">
        <h3 className="mb-4 title">View User Order</h3>
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
      {loader ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={tableData} columns={columns} />
      )}
    </>
  );
};

export default OrderView;
