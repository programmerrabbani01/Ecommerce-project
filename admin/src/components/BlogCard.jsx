import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import formatToDate from "../utils/formatToData.js";

const BlogCard = ({ data = null }) => {
  return (
    <>
      <div className="blogCard">
        <div className="cardImage">
          <Link to={`/blogs/${data?.id}`}>
            <img src={data?.image} alt={data?.id} className="img-fluid w-100" />
          </Link>
        </div>
        <div className="blogContent">
          <p className="date">{formatToDate(data?.createdAt)}</p>
          <h5 className="title">{data?.title}</h5>
          <p className="desc">{data?.description}</p>
          <Link to={`/blogs/${data?.id}`} className="button">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};

BlogCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BlogCard;
