import { Link } from "react-router-dom";
import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";

const SingleBlog = () => {
  const title = "DynamicBlogName - Digitic";
  return (
    <>
      <MetaData title={title} />
      <BreadCum title="DynamicBlogName" />

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
                <h3 className="title">
                  A Beautiful Sunday Morning Renaissance
                </h3>
                <img
                  src="/images/blog-1.jpg "
                  alt=""
                  className="img-fluid w-100 my-4"
                />
                <p className="singlePra">
                  You’re only as good as your last collection, which is an
                  enormous pressure. I think there is something about luxury –
                  it’s not something people need, but it’s what they want. It
                  really pulls at their heart. I have a fantastic relationship
                  with money.Scelerisque sociosqu ullamcorper urna nisl mollis
                  vestibulum pretium commodo inceptos cum condimentum placerat
                  diam venenatis blandit hac eget dis lacus a parturient a
                  accumsan nisl ante vestibulum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
