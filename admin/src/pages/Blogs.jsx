import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";
import BlogCard from "../components/BlogCard.jsx";

const Blogs = () => {
  const title = "Blogs - Digitic";

  return (
    <>
      <MetaData title={title} />
      <BreadCum title="News" />

      {/* Blogs Start */}

      <div className="blog_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-12 ">
              <div className="filter_card mb-3">
                <h3 className="filter_title">Shop by categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>
                      <a href="">Watch</a>
                    </li>
                    <li>
                      <a href="">Tv</a>
                    </li>
                    <li>
                      <a href="">Camera</a>
                    </li>
                    <li>
                      <a href="">Laptop</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12 mb-4">
                  <BlogCard />
                </div>
                <div className="col-lg-6 col-md-6 col-12 mb-4">
                  <BlogCard />
                </div>
                <div className="col-lg-6 col-md-6 col-12 mb-4">
                  <BlogCard />
                </div>
                <div className="col-lg-6 col-md-6 col-12 mb-4">
                  <BlogCard />
                </div>
                <div className="col-lg-6 col-md-6 col-12 mb-4">
                  <BlogCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
