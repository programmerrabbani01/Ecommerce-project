import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsData } from "../features/blog/blogSlice.js";
import { useEffect } from "react";
import { getAllBlogs } from "../features/blog/blogApiSlice.js";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

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

  const { blogs } = useSelector(getAllBlogsData);

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
            <Link to="" className=" fs-5 text-danger">
              <FaEdit />
            </Link>
            <Link to="" className="ms-3 fs-5 text-danger">
              <FaRegTrashAlt />
            </Link>
          </>
        ),
      });
    }
  }

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
