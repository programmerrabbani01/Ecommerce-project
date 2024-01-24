import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";

const Wishlist = () => {
  const title = "Wishlist - Digitic";

  return (
    <>
      <MetaData title={title} />
      <BreadCum title="Wishlist" />

      {/* Wishlist Start*/}

      <div className="wishlist_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12 mb-4">
              <div className="wishlist_card position-relative">
                <img
                  src="../../public/images/cross.svg"
                  className="position-absolute cross img-fluid"
                  alt="cross"
                />
                <div className="wishlist_card_image">
                  <img
                    src="/images/watch.jpg"
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                <div className="px-3 py-3">
                  <h5 className="title">
                    Honor T1 7.0 1 GB Rom 7 Inc With Wi-Fi-+3G Tablet
                  </h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mb-4">
              <div className="wishlist_card position-relative">
                <img
                  src="../../public/images/cross.svg"
                  className="position-absolute cross img-fluid"
                  alt="cross"
                />
                <div className="wishlist_card_image">
                  <img
                    src="/images/watch.jpg"
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                <div className="px-3 py-3">
                  <h5 className="title">
                    Honor T1 7.0 1 GB Rom 7 Inc With Wi-Fi-+3G Tablet
                  </h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mb-4">
              <div className="wishlist_card position-relative">
                <img
                  src="../../public/images/cross.svg"
                  className="position-absolute cross img-fluid"
                  alt="cross"
                />
                <div className="wishlist_card_image">
                  <img
                    src="/images/watch.jpg"
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                <div className="px-3 py-3">
                  <h5 className="title">
                    Honor T1 7.0 1 GB Rom 7 Inc With Wi-Fi-+3G Tablet
                  </h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12 ">
              <div className="wishlist_card position-relative">
                <img
                  src="../../public/images/cross.svg"
                  className="position-absolute cross img-fluid"
                  alt="cross"
                />
                <div className="wishlist_card_image">
                  <img
                    src="/images/watch.jpg"
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                <div className="px-3 py-3">
                  <h5 className="title">
                    Honor T1 7.0 1 GB Rom 7 Inc With Wi-Fi-+3G Tablet
                  </h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
