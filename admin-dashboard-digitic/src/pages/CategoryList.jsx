import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProductCategoryData, setMessageEmpty } from "../features/productCategory/pCategorySlice.js";
import {
  deleteProductCategory,
  getAllProductCategories,
} from "../features/productCategory/pCategoryApiSlice.js";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
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
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const title = "Category List - FLASHMART";

  const dispatch = useDispatch();

  const { productCategories, error, message } = useSelector(
    getAllProductCategoryData
  );

  useEffect(() => {
    dispatch(getAllProductCategories());
  }, [dispatch]);

  let tableData = [];

  if (Array.isArray(productCategories)) {
    const data1 = productCategories?.map((pc, index) => ({
      key: index + 1,
      name: pc.name,
      action: (
        <>
          <Link to={`/category/${pc?._id}`} className=" fs-5 text-danger">
            <FaEdit />
          </Link>
          <Link
            onClick={() => handleDeleteProductCategory(pc?._id)}
            className="ms-3 fs-5 text-danger"
          >
            <FaRegTrashAlt />
          </Link>
        </>
      ),
    }));

    tableData.push(...data1);
  }

  // delete tag
  const handleDeleteProductCategory = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteProductCategory(id));
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

      {/*  */}

      <h3 className="mb-4 title">Categories</h3>
      <div>
        <Table dataSource={tableData} columns={columns} />
      </div>
    </>
  );
};

export default CategoryList;
