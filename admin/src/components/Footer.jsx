import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsPinterest,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-12 d-flex justify-content-center mb-3">
              <div className="footer_top_data d-flex align-items-center gap-15">
                <img src="images/newsletter.png" alt="newsletter" />
                <h2 className="mb-0 text-white">Sign Up For Newsletter</h2>
              </div>
            </div>
            <div className="col-lg-7 col-12">
              <div className="footer_top_input">
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Your Email Address ..."
                    aria-label="Your Email Address ..."
                    aria-describedby="basic-addon2"
                  />
                  <span className="input-group-text" id="basic-addon2">
                    Subscribe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4">
        <div className="container">
          <div className="row">
            <div className=" col-md-6 col-lg-4 col-12 mb-4">
              <h4 className="mb-4 text-white">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Hno : 1480 GAZI VILA, <br /> Shantibug, Patuakhali Sadar,
                  Patuakhali <br />
                  PostCode : 8600
                </address>
                <Link
                  to="tel:+8801212121212"
                  className="text-white mt-2 d-block mb-2"
                >
                  +8801212121212
                </Link>
                <Link
                  to="mailto:rfd@gmail.com"
                  className="text-white mt-2 d-block mb-2"
                >
                  rfd@gmail.com
                </Link>
                <div className="social_menu d-flex align-items-center gap-30 mt-4">
                  <Link className="iconColor d-block mb-0" to="#">
                    <BsTwitter className="fs-4" />
                  </Link>
                  <Link className="iconColor d-block mb-0" to="#">
                    <BsFacebook className="fs-4" />
                  </Link>
                  <Link className="iconColor d-block mb-0" to="#">
                    <BsPinterest className="fs-4" />
                  </Link>
                  <Link className="iconColor d-block mb-0" to="#">
                    <BsInstagram className="fs-4" />
                  </Link>
                  <Link className="iconColor d-block mb-0" to="#">
                    <BsYoutube className="fs-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-lg-3 col-12 mb-4">
              <h4 className="mb-4 text-white">Information</h4>
              <div className="footer_links d-flex flex-column">
                <Link to="/privacyPolicy" className="text-white py-2 mb-1">
                  Privacy policy
                </Link>
                <Link to="/refundPolicy" className="text-white py-2 mb-1">
                  Refund policy
                </Link>
                <Link to="/shippingPolicy" className="text-white py-2 mb-1">
                  Shipping policy
                </Link>
                <Link to="/termsOfService" className="text-white py-2 mb-1">
                  Terms of service
                </Link>
                <Link to="/blogs" className="text-white py-2 mb-1">
                  Blogs
                </Link>
              </div>
            </div>
            <div className=" col-md-6 col-lg-3 col-12 mb-4">
              <h4 className="mb-4 text-white">Account</h4>
              <div className="footer_links d-flex flex-column">
                <Link to="" className="text-white py-2 mb-1">
                  Search
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  About us
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Faq
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Contact
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  Size chart
                </Link>
              </div>
            </div>
            <div className=" col-md-6 col-lg-2 col-12">
              <h4 className="mb-4 text-white">Quick links</h4>
              <div className="footer_links d-flex flex-column">
                <Link to="" className="text-white py-2 mb-1">
                  Accessories
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  laptops
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  headphones
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  smart watches
                </Link>
                <Link to="" className="text-white py-2 mb-1">
                  tablets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Powered by FLASHMART
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
