import { Link, useParams } from "react-router-dom";
import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getBlogData } from "../features/blogs/blogSlice.js";
import { useEffect } from "react";
import { getSIngleBlog } from "../features/blogs/blogApiSlice.js";

const SingleBlog = () => {
  const title = "DynamicBlogName - FLASHMART";

  const dispatch = useDispatch();
  const { singleBlog, loader } = useSelector(getBlogData);
  //get the brand id
  const { id } = useParams();

  //get single blog
  useEffect(() => {
    dispatch(getSIngleBlog(id));
  }, [dispatch, id]);

  return (
    <>
      <MetaData title={title} />
      <BreadCum title={singleBlog?.title} />

      {/* SingleBlog Start */}

      <div className="SingleBlog_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="singleBlogCard">
                <Link to="/blogs">
                  <svg
                    viewBox="0 0 14 10"
                    fill="#000"
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                    className="icon icon-arrow"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                      fill="#000"
                    ></path>
                  </svg>
                  Back to blog
                </Link>
                <h3 className="title">{singleBlog?.title}</h3>
                <img
                  src={singleBlog?.image}
                  alt=""
                  className="img-fluid w-100 my-4"
                />
                <p className="singlePra">{singleBlog?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
