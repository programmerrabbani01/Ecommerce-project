import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const SpecialProduct = () => {
  return (
    <>
      <div className="col-lg-6 col-md-6 col-12 mb-3">
        <div className="specialProductCard">
          <div className="d-flex justify-content-between specialPI">
            <div>
              <img
                src="../../public/images/watch.jpg"
                alt=""
                className="img-fluid"
              />
            </div>

            <div className="specialProductContent">
              <h5 className="brand">Havells</h5>
              <h6 className="title">
                Samsung Galaxy Note10+ Mobile Phone; Sim...
              </h6>
              <ReactStars
                count={5}
                size={24}
                value={4}
                edit={false}
                activeColor="#ffd700"
              />

              <p className="price">
                <span className="redP">$100.00</span> &nbsp;
                <strike>$200.00</strike>
              </p>

              <div className="discountTill d-flex align-items-center gap-10">
                <p className="mb-0">
                  <b>5 </b>days
                </p>
                <div className="d-flex align-items-center gap-1">
                  <span className="badge rounded-circle p-2 bg-danger">07</span>
                  :
                  <span className="badge rounded-circle p-2 bg-danger">06</span>
                  :
                  <span className="badge rounded-circle p-2 bg-danger">35</span>
                </div>
              </div>
              <div className="productCount mt-3">
                <p>Products: 5</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "25%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <Link to="" className="button my-3">
                Add To Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
