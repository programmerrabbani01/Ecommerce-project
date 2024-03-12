import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import { createToaster } from "../utils/toastify.js";
import PropTypes from "prop-types";
import {
  getUserAuthData,
  setMessageEmpty,
} from "../features/user/userSlice.js";
import { addWIshList } from "../features/user/userApiSlice.js";

const ProductCard = ({ data = null, grid = 4 }) => {
  let location = useLocation();
  const [isWishlist, setIsWishlist] = useState(false);
  const dispatch = useDispatch();

  const { wishlist, error, message } = useSelector(getUserAuthData);

  //add wishlist item
  const handleChangeWishList = (e, id) => {
    e.preventDefault();
    if (id) {
      dispatch(addWIshList(id));
    }
  };
  // Update useEffect to reflect changes in wishlist state
  useEffect(() => {
    // Check if the product is in the wishlist
    if (wishlist) {
      const isInWishlist = wishlist.some((item) => item?._id === data?._id);
      setIsWishlist(isInWishlist);
    }
  }, [wishlist, data]);

  // console.log(isWishlist);

  // // messages

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
      <div
        className={`${
          location.pathname == "/ourStore"
            ? `col-lg-${grid} col-md-6 col-6`
            : "col-lg-3 col-md-6 col-12"
        }`}
      >
        <Link
          to={`${
            location.pathname == "/"
              ? "/ourStore/:id"
              : location.pathname == "/ourStore/:id"
              ? "/ourStore/1"
              : ":id"
          }`}
          className="productCard position-relative"
        >
          <div className="wishListIcon position-absolute">
            <Link
              className="wishlistIcon"
              to="#"
              onClick={(e) => handleChangeWishList(e, data._id)}
            >
              {isWishlist ? (
                <img width={18} src="/images/wish-black.svg" alt="" />
              ) : (
                <img src="/images/wish.svg" alt="" />
              )}
            </Link>
          </div>
          <div className="productImage">
            {data?.photos?.[0]?.url && (
              <img
                src={data.photos[0].url}
                alt="product image"
                className="img-fluid"
              />
            )}

            {data?.photos?.[1]?.url && (
              <img
                src={data.photos[1].url}
                alt="product image"
                className="img-fluid"
              />
            )}
          </div>
          <div className="productDetails">
            <h6 className="brand">{data?.brand?.name}</h6>
            <h5 className="productTitle">{data?.title}</h5>
            <ReactStars
              count={5}
              //   onChange={ratingChanged}
              size={24}
              value={data?.totalRating}
              edit={false}
              activeColor="#ffd700"
            />
            <p
              className={`dsc ${grid === 12 ? "d-block" : "d-none"}`}
              dangerouslySetInnerHTML={{ __html: data?.desc }}
            ></p>
            <div className="price">
              <p className="regularPrice">$ {data?.regularPrice}</p>
              <p className="salePrice">$ {data?.salePrice}</p>
            </div>
          </div>
          <div className="actionBar position-absolute">
            <div className="d-flex flex-column gap-10">
              <Link>
                <img src="/images/prodcompare.svg" alt="product compare" />
              </Link>
              <Link>
                <img src="/images/view.svg" alt="view" />
              </Link>
              <Link>
                <img src="/images/add-cart.svg" alt="add Cart" />
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object.isRequired, // You can specify the exact shape of the object if needed
  grid: PropTypes.number.isRequired,
};

export default ProductCard;
