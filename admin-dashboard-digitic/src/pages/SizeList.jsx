import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import swal from "sweetalert";
import { createToaster } from "../utils/toastify.js";
import {
  getAllSizesData,
  setMessageEmpty,
} from "../features/size/sizeSlice.js";
import { deleteSize, getAllSize } from "../features/size/sizeApiSlice.js";

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

const SizeList = () => {
  const title = "Size List - FLASHMART";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSize());
  }, [dispatch]);

  const { sizes, error, message } = useSelector(getAllSizesData);


  console.log(sizes);

  let tableData = [];

  if (sizes instanceof Array) {
    const data1 = sizes?.map((size, index) => ({
      key: index + 1,
      name: size.name,
      action: (
        <>
          <Link
            onClick={() => handleDeleteASize(size?._id)}
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
  const handleDeleteASize = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteSize(id));
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

      <h3 className="mb-4 title ">Sizes</h3>
      <div>
        <Table dataSource={tableData} columns={columns} />
      </div>
    </>
  );
};

export default SizeList;
