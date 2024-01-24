import MetaData from "../components/MetaData.jsx";
import BreadCum from "../components/BreadCum.jsx";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const CheckOut = () => {
  const title = "Check-Out - Digitic";
  return (
    <>
      <MetaData title={title} />
      <BreadCum title="Check-Out" />

      {/* Check Out Start */}
      <div className="checkOut_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-7">
              <div className="checkOutLeftData">
                <h3 className="websiteName">Digitic</h3>
                <nav
                  style={{
                    "--bs-breadcrumb-divider":
                      "url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34)",
                  }}
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/cart" className="text-dark">
                        Cart
                      </Link>
                    </li>

                    <li className="breadcrumb-item active" aria-current="page">
                      Information
                    </li>

                    <li className="breadcrumb-item active" aria-current="page">
                      Shipping
                    </li>

                    <li className="breadcrumb-item active" aria-current="page">
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title">Contact Information</h4>
                <p className="userDetails">
                  golam rabbani(gmgolamrabbani@gmail.com)
                </p>
                <form className="d-flex gap-15 flex-wrap justify-content-between">
                  <div className="w-100">
                    <select name="" id="" className="form-control">
                      <option value="" selected disabled>
                        Select Country
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Address"
                    />
                  </div>
                  <div className="w-25 ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                  <div className="w-25">
                    <select
                      name=""
                      id=""
                      className="form-control"
                      placeholder="State"
                    >
                      <option value="" selected disabled>
                        State
                      </option>
                    </select>
                  </div>
                  <div className="w-25 ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip"
                    />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className="text-dark">
                        <IoIosArrowBack className="returnArrow" /> Return To
                        Cart
                      </Link>
                      <Link to="/cart" className="button">
                        Continue To Shipping
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-5">
              <div className=" d-flex align-items-center mb-2 py-4 gap-10 border-bottom">
                <div className="w-75 d-flex gap-15">
                  <div className="w-25 position-relative">
                    <span
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                      style={{ top: "-8px", right: "-8px" }}
                    >
                      1
                    </span>
                    <img
                      src="https://demo-digitic.myshopify.com/cdn/shop/products/24_150x.jpg?v=1655098000"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div>
                    <h5 className="cartProductTitle">
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <p className="cartProductSize">Size: S</p>
                    <p className="cartProductColor">Color: #A85A5A</p>
                  </div>
                </div>
                <div>
                  <h5>$100.00</h5>
                </div>
              </div>
              <div className="py-4 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">Subtotal</p>
                  <p className="mb-0">$100.00</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0">Shipping</p>
                  <p className="mb-0">Enter shipping address</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <h4>Total</h4>
                <h5>$100.00</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
