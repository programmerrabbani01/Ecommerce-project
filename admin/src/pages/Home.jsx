import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SpecialProduct from "../components/SpecialProduct.jsx";
import MetaData from "../components/MetaData.jsx";
import { services } from "../utils/Data.js";

const Home = () => {
  const title = "Home - Digitic";

  return (
    <>
      <MetaData title={title} />

      <section className="home_wrapper_1 py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mb-3">
              <div className="main_banner_Image position-relative ">
                <img
                  src="images/main-banner.jpg"
                  className="img-fluid w-100 rounded-3"
                  alt="main banner"
                />
                <div className="main_banner_text position-absolute">
                  <h4>Supercharged for pros.</h4>
                  <h5>Special Sale</h5>
                  <p>
                    From $999.00 or $41.62/mo. <br /> for 24 mo. Footnote*
                  </p>
                  <Link to="" className="button">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className=" gap-10 ">
                <div className="row">
                  <div className="col-md-6 col-12 mb-3">
                    <div className="small_banner_Image position-relative ">
                      <img
                        src="images/catbanner-01.jpg"
                        className=" smallImage img-fluid rounded-3"
                        alt="main banner"
                      />
                      <div className="small_banner_text position-absolute">
                        <h4>Best sale</h4>
                        <h5>Laptops max</h5>
                        <p>
                          From $1699.00 or <br /> $64.62/mo.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <div className="small_banner_Image position-relative ">
                      <img
                        src="images/catbanner-03.jpg"
                        className=" smallImage img-fluid rounded-3"
                        alt="main banner"
                      />
                      <div className="small_banner_text position-absolute">
                        <h4>New arrival</h4>
                        <h5>Buy iPad air</h5>
                        <p>
                          From $599 or <br /> $49.91/mo. for 12 mo. * .
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <div className="small_banner_Image position-relative ">
                      <img
                        src="images/catbanner-02.jpg"
                        className=" smallImage img-fluid rounded-3"
                        alt="main banner"
                      />
                      <div className="small_banner_text position-absolute">
                        <h4>15% off</h4>
                        <h5>smartwatch 7</h5>
                        <p>
                          Shop the latest band <br /> styles and colors.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="small_banner_Image position-relative ">
                      <img
                        src="images/catbanner-04.jpg"
                        className=" smallImage img-fluid rounded-3"
                        alt="main banner"
                      />
                      <div className="small_banner_text position-absolute">
                        <h4>Free engraving</h4>
                        <h5>AirPods max</h5>
                        <p>
                          High-fidelity playback <br /> & ultra-low distortion
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="services">
                <div className="row">
                  {services?.map((item, index) => {
                    return (
                      <div
                        className="col-lg-3 col-sm-6 col-12 mb-4 "
                        key={index}
                      >
                        <div className="d-flex align-items-center gap-15 serviceImage">
                          <img src={item.image} alt="" />
                          <div>
                            <h6>{item.title}</h6>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="categories">
                <div className="d-flex  align-items-center justify-content-between w-100">
                  <div>
                    <h6 className="mb-2">Cameras & Videos</h6>
                    <p className="mb-0">10 items</p>
                  </div>
                  <img src="/images/03_110x110.webp" alt="" />
                </div>

                <div className="d-flex  align-items-center justify-content-between w-100">
                  <div>
                    <h6 className="mb-2">Smart Television</h6>
                    <p className="mb-0">12 items</p>
                  </div>
                  <img src="/images/tv.jpg" alt="" />
                </div>

                <div className="d-flex  align-items-center justify-content-between w-100">
                  <div>
                    <h6 className="mb-2">Smart watches</h6>
                    <p className="mb-0">13 items</p>
                  </div>
                  <img src="/images/camera.jpg" alt="" />
                </div>

                <div className="d-flex  align-items-center justify-content-between w-100">
                  <div>
                    <h6 className="mb-2">Music & Gaming</h6>
                    <p className="mb-0">4 items</p>
                  </div>
                  <img src="/images/06_110x110.webp" alt="" />
                </div>

                <div className="d-flex  align-items-center justify-content-between w-100">
                  <div>
                    <h6 className="mb-2">Headphones</h6>
                    <p className="mb-0">6 items</p>
                  </div>
                  <img src="/images/07_110x110.webp" alt="" />
                </div>

                <div className="d-flex  align-items-center justify-content-between w-100">
                  <div>
                    <h6 className="mb-2">Accessories</h6>
                    <p className="mb-0">10 items</p>
                  </div>
                  <img src="/images/08_110x110.webp" alt="" />
                </div>

                <div className="d-flex  align-items-center justify-content-between w-100">
                  <div>
                    <h6 className="mb-2">Portable Speakers</h6>
                    <p className="mb-0">8 items</p>
                  </div>
                  <img src="/images/09_110x110.avif" alt="" />
                </div>

                <div className="d-flex  align-items-center justify-content-between w-100">
                  <div>
                    <h6 className="mb-2">Home Appliances</h6>
                    <p className="mb-0">6 items</p>
                  </div>
                  <img src="/images/10_110x110.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured_wrapper py-5 home_wrapper_2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="sectionHeading">Featured Collection</h3>
            </div>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>

      <section className="famous_wrapper py-5 home_wrapper_2">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12 mb-4">
              <div className="famous_card position-relative">
                <img
                  src="../../public/images/subbanner-01.webp"
                  alt="subbanner-01"
                  className="img-fluid w-100"
                />
                <div className="famous_content position-absolute">
                  <h5>big screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399or $16.62/mo. for 24 mo.*</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mb-4">
              <div className="famous_card position-relative">
                <img
                  src="../../public/images/subbanner-02.webp"
                  alt="subbanner-01"
                  className="img-fluid w-100"
                />
                <div className="famous_content position-absolute">
                  <h5 className="whiteImageH5">Studio Display</h5>
                  <h6 className="whiteImageH6">600 nits of brightness.</h6>
                  <p className="whiteImageP">27-inch 5K Retina display</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mb-4">
              <div className="famous_card position-relative">
                <img
                  src="../../public/images/subbanner-03.webp"
                  alt="subbanner-01"
                  className="img-fluid w-100"
                />
                <div className="famous_content position-absolute">
                  <h5 className="whiteImageH5">smartphones</h5>
                  <h6 className="whiteImageH6">Smartphone 13 Pro.</h6>
                  <p className="whiteImageP">
                    Now in Green. From $999.00 or $41.62/mo. for 24 mo.
                    Footnote*
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="famous_card position-relative">
                <img
                  src="../../public/images/subbanner-04.webp"
                  alt="subbanner-01"
                  className="img-fluid w-100"
                />
                <div className="famous_content position-absolute">
                  <h5 className="whiteImageH5">home speakers</h5>
                  <h6 className="whiteImageH6">Room-filling sound.</h6>
                  <p className="whiteImageP">
                    From $699 or $116.58/mo. for 12 mo.*
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="special_wrapper py-5 home_wrapper_2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="sectionHeading">Special Products</h3>
            </div>
          </div>
          <div className="row">
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
          </div>
        </div>
      </section>

      <section className="popular_wrapper py-5 home_wrapper_2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="sectionHeading">Our Popular Products</h3>
            </div>
          </div>
          <div className="row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </section>

      <section className="marquee_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="marquee_inner_wrapper card_wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="/images/brand-01.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-02.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-03.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-04.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-05.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-06.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-07.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="/images/brand-08.png" alt="brand" />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog_wrapper py-5 home_wrapper_2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="sectionHeading">our latest news</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6 col-12 mb-4">
              <BlogCard />
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-4">
              <BlogCard />
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-4">
              <BlogCard />
            </div>
            <div className="col-lg-3 col-md-6 col-12 ">
              <BlogCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
