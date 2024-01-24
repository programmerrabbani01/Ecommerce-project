import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteTag, getAllTag } from "../features/tag/tagApiSlice.js";
import { getAllTagsData, setMessageEmpty } from "../features/tag/tagSlice.js";
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

const TagList = () => {
  const title = "Tag List - Digitic";

  const dispatch = useDispatch();

  const { tags, error, message } = useSelector(getAllTagsData);

  useEffect(() => {
    dispatch(getAllTag());
  }, [dispatch]);

  let tableData = [];

  if (tags ?? false) {
    const data1 = tags?.map((tag, index) => ({
      key: index + 1,
      name: tag.name,
      action: (
        <>
          <Link to={`/tag/${tag?._id}`} className=" fs-5 text-danger">
            <FaEdit />
          </Link>
          <Link
            onClick={() => handleDeleteATag(tag?._id)}
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
  const handleDeleteATag = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteTag(id));
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

      <h3 className="mb-4 title ">Tags</h3>
      <div>
        <Table dataSource={tableData} columns={columns} />
      </div>
    </>
  );
};

export default TagList;
