import Colors from "../components/Colors.jsx";
import ReactStars from "react-rating-stars-component";

const ProductSidebar = () => {
  return (
    <>
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
      <div className="filter_card mb-3">
        <h3 className="filter_title">Filter by</h3>
        <div className="marginB">
          <h5 className="sub_title">Availability</h5>
          <div className="paddingLeft">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id=""
              />
              <label className="form-check-label" htmlFor="">
                In stock (21)
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id=""
              />
              <label className="form-check-label" htmlFor="">
                Out of stock (1)
              </label>
            </div>
          </div>
        </div>
        <div className="marginB">
          <h5 className="sub_title">Price</h5>
          <div className="paddingLeft d-flex align-items-center gap-10">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                placeholder="From"
              />
              <label htmlFor="floatingInput">From</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control "
                id="floatingInput"
                placeholder="To"
              />
              <label htmlFor="floatingInput">To</label>
            </div>
          </div>
        </div>
        <div className="marginB">
          <h5 className="sub_title">Color</h5>
          <div className="paddingLeft">
            <Colors />
          </div>
        </div>
        <div className="marginB">
          <h5 className="sub_title">Size</h5>
          <div className="paddingLeft">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id=""
              />
              <label className="form-check-label" htmlFor="">
                S (10)
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id=""
              />
              <label className="form-check-label" htmlFor="">
                M (13)
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id=""
              />
              <label className="form-check-label" htmlFor="">
                L (10)
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id=""
              />
              <label className="form-check-label" htmlFor="">
                XL (5)
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id=""
              />
              <label className="form-check-label" htmlFor="">
                XXL (5)
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="filter_card mb-3">
        <h3 className="filter_title">Product tag</h3>
        <div>
          <div className="products_tags">
            <ul>
              <li>
                <a href="#">headphones</a>
              </li>
              <li>
                <a href="#">laptop</a>
              </li>
              <li>
                <a href="#">mobile</a>
              </li>
              <li>
                <a href="#">oppo</a>
              </li>
              <li>
                <a href="#">speaker</a>
              </li>
              <li>
                <a href="#">tablet</a>
              </li>
              <li>
                <a href="#">vivo</a>
              </li>
              <li>
                <a href="#">wire</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="filter_card mb-3">
        <h3 className="filter_title">Random Products</h3>
        <div>
          <div className="random_products d-flex ">
            <div className="w-50">
              <img src="/images/24_260x.avif" className="img-fluid" alt="" />
            </div>
            <div className="w-50">
              <h4>
                <a href="">
                  Kids headphones bulk 10 pack multi colored for students
                </a>
              </h4>
              <ReactStars
                count={5}
                //   onChange={ratingChanged}
                size={24}
                value={3}
                edit={false}
                activeColor="#ffd700"
              />

              <p className="price">$100.00</p>
            </div>
          </div>

          <div className="random_products d-flex">
            <div className="w-50">
              <img src="/images/22_150x.avif" className="img-fluid" alt="" />
            </div>
            <div className="w-50">
              <h4>
                <a href="">APPLE Watch Series 2 – 42 mm Stainless Steel Case</a>
              </h4>
              <ReactStars
                count={5}
                //   onChange={ratingChanged}
                size={24}
                value={3}
                edit={false}
                activeColor="#ffd700"
              />

              <p className="price">$100.00</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSidebar;
