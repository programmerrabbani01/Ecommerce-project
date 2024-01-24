import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllBlogsCategoryData } from "../features/blogCategory/blogCategorySlice.js";
import { getAllBlogCategory } from "../features/blogCategory/blogCategoryApiSlice.js";

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
  const title = "Blog Categories - Digitic";

  const dispatch = useDispatch();

  const { blogCategories } = useSelector(getAllBlogsCategoryData);

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

      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table dataSource={data1} columns={columns} />
      </div>
    </>
  );
};

export default BlogCategoryList;
