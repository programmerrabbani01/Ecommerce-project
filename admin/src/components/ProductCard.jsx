import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";

const ProductCard = (props) => {
  const { grid } = props;

  let location = useLocation();

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
            <Link>
              <img src="/images/wish.svg" alt="" />
            </Link>
          </div>
          <div className="productImage">
            <img
              src="/images/24_260x.avif"
              alt="product image"
              className="img-fluid"
            />
            <img
              src="../../public/images/24-01_260x2.avif"
              alt="product image"
              className="img-fluid"
            />
          </div>
          <div className="productDetails">
            <h6 className="brand">Havells</h6>
            <h5 className="productTitle">
              Kids headphones bulk 10 pack multi colored for students
            </h5>
            <ReactStars
              count={5}
              //   onChange={ratingChanged}
              size={24}
              value={3}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`dsc ${grid === 12 ? "d-block" : "d-none"}`}>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt...
            </p>
            <p className="price">$100.00</p>
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

export default ProductCard;
