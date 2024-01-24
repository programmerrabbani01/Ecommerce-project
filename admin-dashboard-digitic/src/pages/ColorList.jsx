import { Badge, Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllColorsData,
  setMessageEmpty,
} from "../features/color/colorSlice.js";
import { useEffect } from "react";
import { deleteColor, getAllColors } from "../features/color/colorApiSlice.js";
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
    title: "Color Code",
    dataIndex: "colorCode",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const title = "Color List - Digitic";

  const dispatch = useDispatch();

  const { colors, error, message } = useSelector(getAllColorsData);

  useEffect(() => {
    dispatch(getAllColors());
  }, [dispatch]);

  let tableData = [];

  if (colors ?? false) {
    const data1 = colors?.map((color, index) => ({
      key: index + 1,
      name: color.name,
      colorCode: (
        <>
          {color.colorCode && (
            <Badge count={color.name} showZero color={`${color?.colorCode}`} />
          )}
        </>
      ),
      action: (
        <>
          <Link to={`/color/${color?._id}`} className=" fs-5 text-danger">
            <FaEdit />
          </Link>
          <Link
            onClick={() => handleDeleteAColor(color?._id)}
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
  const handleDeleteAColor = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteColor(id));
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

      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table dataSource={tableData} columns={columns} />
      </div>
    </>
  );
};

export default ColorList;
