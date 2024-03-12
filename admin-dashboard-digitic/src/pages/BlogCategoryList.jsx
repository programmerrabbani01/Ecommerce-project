import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllBlogsCategoryData,
  setMessageEmpty,
} from "../features/blogCategory/blogCategorySlice.js";
import {
  deleteBlogCategory,
  getAllBlogCategory,
} from "../features/blogCategory/blogCategoryApiSlice.js";
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

const BlogCategoryList = () => {
  const title = "Blog Categories - FLASHMART";

  const dispatch = useDispatch();

  const { error, message, blogCategories } = useSelector(
    getAllBlogsCategoryData
  );

  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, [dispatch]);

  const data1 = [];

  if (blogCategories !== null) {
    for (let i = 0; i < blogCategories?.length; i++) {
      data1.push({
        key: i + 1,
        name: blogCategories[i].name,
        category: blogCategories[i].category,
        action: (
          <>
            <Link
              to={`/blogCategory/${blogCategories[i]?._id}`}
              className=" fs-5 text-danger"
            >
              <FaEdit />
            </Link>
            <Link
              onClick={() => handleDeleteBlogCategory(blogCategories[i]?._id)}
              className="ms-3 fs-5 text-danger"
            >
              <FaRegTrashAlt />
            </Link>
          </>
        ),
      });
    }
  }

  // delete blog
  const handleDeleteBlogCategory = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteBlogCategory(id));
          // swal("Proof! Your Imaginary File Has Been Deleted", {
          //   icon: "success",
          // });
        } else {
          swal("Your Imaginary File Is Safe!");
        }
      });
    }
  };

  // handle messages
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

      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table dataSource={data1} columns={columns} />
      </div>
    </>
  );
};

export default BlogCategoryList;
