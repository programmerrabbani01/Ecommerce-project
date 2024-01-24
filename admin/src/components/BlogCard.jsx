import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <>
      <div className="blogCard">
        <div className="cardImage">
          <img src="/images/blog-1.jpg " alt="" className="img-fluid w-100" />
        </div>
        <div className="blogContent">
          <p className="date">11 June, 2022</p>
          <h5 className="title">A beautiful sunday morning renaissance</h5>
          <p className="desc">
            You’re only as good as your last collection, which is an enormous
            pressure. I think there is something about luxury...
          </p>
          <Link to="/blogs/:id" className="button">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
