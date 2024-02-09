import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBrandsData,
  setMessageEmpty,
} from "../features/brand/brandSlice.js";
import { useEffect } from "react";
import { deleteBrands, getAllBrands } from "../features/brand/brandApiSlice.js";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { createToaster } from "../utils/toastify.js";
import swal from "sweetalert";

// table data
const columns = [
  {
    title: "S.No",
    dataIndex: "key",
  },
  {
    title: "Photo",
    dataIndex: "photo",
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

const BrandList = () => {
  const title = "Brand List - Digitic";

  const dispatch = useDispatch();

  const { brands, error, message } = useSelector(getAllBrandsData);

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  let tableData = [];

  if (brands ?? false) {
    const data1 = brands?.map((brand, index) => ({
      key: index + 1,
      name: brand.name,
      photo: (
        <>
          {brand?.photo && (
            <img className="productImage" src={brand?.photo} alt="" />
          )}
        </>
      ),
      action: (
        <>
          <Link to={`/brand/${brand?._id}`} className=" fs-5 text-danger">
            <FaEdit />
          </Link>
          <Link
            onClick={() => handleBrandDelete(brand?._id)}
            className="ms-3 fs-5 text-danger"
          >
            <FaRegTrashAlt />
          </Link>
        </>
      ),
    }));

    tableData.push(...data1);
  }

  // delete brand
  const handleBrandDelete = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteBrands(id));
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

      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table dataSource={tableData} columns={columns} />
      </div>
    </>
  );
};

export default BrandList;
