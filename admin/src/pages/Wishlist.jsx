import { useDispatch, useSelector } from "react-redux";
import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";
import { addWIshList } from "../features/user/userApiSlice.js";
import { useEffect } from "react";
import { createToaster } from "../utils/toastify.js";
import { setMessageEmpty } from "../features/user/userSlice.js";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const title = "Wishlist - FLASHMART";

  const dispatch = useDispatch();

  const { wishlist, error, message } = useSelector((state) => state.userAuth);

  //add wishlist item
  const handleChangeWishList = (e, id) => {
    e.preventDefault();
    if (id) {
      dispatch(addWIshList(id));
    }
  };

  //   handle messages
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
      <BreadCum title="Wishlist" />

      {/* Wishlist Start*/}

      <div className="wishlist_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            {wishlist &&
              wishlist.map((item, index) => {
                return (
                  <div key={index} className="col-lg-3 col-md-6 col-12 mb-4">
                    <div className="wishlist_card position-relative">
                      <img
                        onClick={(e) => handleChangeWishList(e, item._id)}
                        src="../../public/images/cross.svg"
                        className="position-absolute cross img-fluid"
                        alt="cross"
                      />
                      <div className="wishlist_card_image">
                        <Link to={`/ourStore/${item?.id}`}>
                          <img
                            src={item?.photos[0]?.url}
                            className="img-fluid w-100"
                            alt="watch"
                          />
                        </Link>
                      </div>
                      <div className="px-3 py-3">
                        <Link to={`/ourStore/${item?.id}`}>
                          <h5 className="title">{item?.title}</h5>
                        </Link>
                        <div className="wishCartPrice">
                          <h6 className="regularPrice">
                            $ {item?.regularPrice}
                          </h6>
                          <h6 className="salePrice">$ {item?.salePrice}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {wishlist && !wishlist.length && (
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body text-center">
                    Wishlist Not Found
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
