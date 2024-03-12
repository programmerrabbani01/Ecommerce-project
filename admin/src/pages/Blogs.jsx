import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";
import BlogCard from "../components/BlogCard.jsx";
import { useSelector } from "react-redux";
import BlogSideBar from "../components/BlogSideBar.jsx";

const Blogs = () => {
  const title = "Blogs - FLASHMART";

  const { blogs } = useSelector((state) => state.blog);

  return (
    <>
      <MetaData title={title} />
      <BreadCum title="News" />

      {/* Blogs Start */}

      <div className="blog_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-12 ">
              <BlogSideBar />
            </div>

            <div className="col-lg-9 col-12">
              <div className="row">
                {blogs &&
                  blogs?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="col-lg-6 col-md-6 col-12 mb-4"
                      >
                        <BlogCard data={item} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
