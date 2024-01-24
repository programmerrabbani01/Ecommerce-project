import { Link, NavLink } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import { FaBars } from "react-icons/fa6";

const Header = () => {
  return (
    <>
      <header className="header_first py-3">
        <div className="container">
          <div className="row">
            <div className="col-6 mobileHidden">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-lg-6 col-12 topHotline">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8265458598">
                  +91 8265458598
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header_second py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-5 logoArea">
              <a
                className="desktopHidden"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                <FaBars />
              </a>
              <h2>
                <Link to="" className="text-white">
                  FLASHMART
                </Link>
              </h2>
            </div>
            <div className="col-lg-5 mobileHidden">
              <SearchBar />
            </div>
            <div className="col-lg-5 col-7">
              <div className="header_second_links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compareProduct"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/compare.svg" alt="compare" />
                    <p className="mb-0">
                      Compare <br /> products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/wishlist.svg" alt="wishlist" />
                    <p className="mb-0">
                      favorite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/login"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/user.svg" alt="user" />
                    <p className="mb-0">
                      Log in <br /> my account
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="/images/cart2.webp" alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">0</span>
                      <p className="mb-0">$500</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header_three py-3">
        <div className="container">
          <div className="row">
            <div className="headerBottomSearchBar desktopHidden">
              <SearchBar />
            </div>
            <div className="col-12 mobileHidden">
              <div className="menu_bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex align-items-center gap-15"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="images/menu.svg" alt="" />
                      <span className="d-inline-block me-5">
                        Shop Categories
                      </span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu_links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/ourStore">Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* mobile menu */}

      <div
        className="offcanvas headerOffcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-white" id="offcanvasExampleLabel">
            FLASHMART
          </h5>
          <button
            type="button"
            className="btn-close text-reset closeButton"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ourStore">Our Store</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
