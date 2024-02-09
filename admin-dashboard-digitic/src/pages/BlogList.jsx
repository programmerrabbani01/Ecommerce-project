import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlogsData,
  setMessageEmpty,
} from "../features/blog/blogSlice.js";
import { useEffect } from "react";
import { deleteBlogs, getAllBlogs } from "../features/blog/blogApiSlice.js";
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
    title: "Photo",
    dataIndex: "image",
  },
  {
    title: "Name",
    dataIndex: "title",
  },
  {
    title: "Category",
    dataIndex: "category",
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

const BlogList = () => {
  const title = "Blog List - Digitic";

  const dispatch = useDispatch();

  const { blogs, error, message } = useSelector(getAllBlogsData);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const data1 = [];

  if (blogs !== null) {
    for (let i = 0; i < blogs?.length; i++) {
      data1.push({
        key: i + 1,
        title: blogs[i].title,
        category: blogs[i].category,
        date: blogs[i].createdAt,
        image: (
          <>
            {blogs[i]?.image && (
              <img className="productImage" src={blogs[i]?.image} alt="" />
            )}
          </>
        ),
        action: (
          <>
            <Link to={`/blog/${blogs[i]?._id}`} className=" fs-5 text-danger">
              <FaEdit />
            </Link>
            <Link
              onClick={() => handleDeleteBlog(blogs[i]?._id)}
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
  const handleDeleteBlog = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteBlogs(id));
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

      <h3 className="mb-4 title">Blogs</h3>
      <div>
        <Table dataSource={data1} columns={columns} />
      </div>
    </>
  );
};

export default BlogList;
