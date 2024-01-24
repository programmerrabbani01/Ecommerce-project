import MetaData from "../components/MetaData.jsx";
import BreadCum from "../components/BreadCum.jsx";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = () => {
  const title = "Cart - Digitic";
  return (
    <>
      <MetaData title={title} />
      <BreadCum title="Your Shopping Cart" />

      {/* Cart Start */}

      <div className="cart_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cartHeader d-flex justify-content-between align-items-center">
                <h4 className="cart_col_1">Product</h4>
                <h4 className="cart_col_2">Price</h4>
                <h4 className="cart_col_3">Quantity</h4>
                <h4 className="cart_col_4">Total</h4>
              </div>

              <div className="cartData d-flex justify-content-between align-items-center">
                <div className="cart_col_1 d-flex align-items-center gap-15">
                  <div className="w-25">
                    <img
                      src="https://demo-digitic.myshopify.com/cdn/shop/products/24_150x.jpg?v=1655098000"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="w-75">
                    <h5 className="cartProductTitle">
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <p className="cartProductSize">Size: S</p>
                    <p className="cartProductColor">Color: #A85A5A</p>
                  </div>
                </div>
                <div className="cart_col_2">
                  <h5 className="price">$100.00</h5>
                </div>
                <div className="cart_col_3 d-flex align-items-center gap-15">
                  <div>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      className="form-control"
                    />
                  </div>
                  <div className="cartDelete">
                    <MdDelete className="cartDeleteIcon" />
                  </div>
                </div>
                <div className="cart_col_4">
                  <h5 className="price">$100.00</h5>
                </div>
              </div>
            </div>

            <div className="col-12 py-3">
              <div className="d-flex justify-content-between align-items-baseline ">
                <Link to="/ourStore" className="button">
                  Continue shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4>Subtotal: $100.00</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkOut" className="button">
                    Check out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
