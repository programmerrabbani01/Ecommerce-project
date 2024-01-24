import { Link } from "react-router-dom";
import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import ReactImageZoom from "react-image-zoom";
import Colors from "../components/Colors.jsx";
import { CiHeart } from "react-icons/ci";
import { MdOutlineCompareArrows } from "react-icons/md";

const SingleProduct = () => {
  const title = "DynamicName - Digitic";

  const [orderedProduct, setOrderedProduct] = useState(null);

  const props = {
    width: 500,
    height: 500,
    zoomWidth: 500,
    img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <>
      <MetaData title={title} />
      <BreadCum title="DynamicName" />

      {/* SingleProduct start */}

      <div className="singleProduct_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="mainProductImage">
                <div>
                  <ReactImageZoom {...props} />
                </div>
              </div>
              <div className="otherProductImage d-flex flex-wrap gap-15">
                <div>
                  <img
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                    alt=""
                    className="img-fluid "
                  />
                </div>
                <div>
                  <img
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                    alt=""
                    className="img-fluid "
                  />
                </div>
                <div>
                  <img
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                    alt=""
                    className="img-fluid "
                  />
                </div>
                <div>
                  <img
                    src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                    alt=""
                    className="img-fluid "
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="mainProductDetails">
                <div className="borderBottom">
                  <h3>
                    Kids Headphones Bulk 10 Pack Multi Colored For Students
                  </h3>
                </div>
                <div className="borderBottom2">
                  <p className="borderBottom2Price">$100.00</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      //   onChange={ratingChanged}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 borderBottom2Reviews">(2 reviews)</p>
                  </div>
                  <a href="#Review" className="borderBottom2WriteReviews">
                    Write a review
                  </a>
                </div>
                <div className="borderBottom3 py-4">
                  <div className="d-flex gap-10 align-items-center">
                    <h3>Type :</h3>
                    <p>Watch</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center">
                    <h3>Brand :</h3>
                    <p>Havells</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center">
                    <h3>Category :</h3>
                    <p>Watch</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center">
                    <h3>Tags :</h3>
                    <p>Watch</p>
                  </div>

                  <div className="d-flex gap-10 align-items-center">
                    <h3>Availability :</h3>
                    <p>In Stock</p>
                  </div>

                  <div className="d-flex gap-10 flex-column">
                    <h3 className="mb-0">Size :</h3>
                    <div className="d-flex flex-wrap gap-10 mb-4">
                      <span
                        className="badge bg-white text-dark border border-secondary"
                        style={{ cursor: "pointer" }}
                      >
                        S
                      </span>
                      <span
                        className="badge bg-white text-dark border border-secondary"
                        style={{ cursor: "pointer" }}
                      >
                        M
                      </span>
                      <span
                        className="badge bg-white text-dark border border-secondary"
                        style={{ cursor: "pointer" }}
                      >
                        L
                      </span>
                      <span
                        className="badge bg-white text-dark border border-secondary"
                        style={{ cursor: "pointer" }}
                      >
                        XL
                      </span>
                      <span
                        className="badge bg-white text-dark border border-secondary"
                        style={{ cursor: "pointer" }}
                      >
                        XXL
                      </span>
                    </div>
                  </div>

                  <div className="d-flex gap-10 flex-column">
                    <h3 className="mb-0">Color :</h3>
                    <div className="mb-4">
                      <Colors />
                    </div>
                  </div>

                  <div className="d-flex gap-10 flex-row align-items-center singleQuantity">
                    <div>
                      <h3>Quantity :</h3>
                    </div>
                    <div>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        className="form-control"
                        style={{ width: "70px", marginBottom: "14px" }}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-15 mb-4 ms-3 singleButton">
                      <button className="button border-0" type="submit">
                        Add To Cart
                      </button>
                      <button className="button border-0" type="submit">
                        Buy It Now
                      </button>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-15">
                    <div className="wc">
                      <a href="">
                        <CiHeart className="fs-5 me-2" />
                        Add to wishlist
                      </a>
                    </div>
                    <div className="wc">
                      <a href="">
                        <MdOutlineCompareArrows className="fs-5 me-2" />
                        Add to compare
                      </a>
                    </div>
                  </div>

                  {/* accordion */}

                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <svg
                            className="icon icon-accordion color-foreground-text"
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                          >
                            <path d="M15.64 6.92L9.5 5.12V4a.5.5 0 00-.5-.5H1a.5.5 0 00-.5.5v8.5c0 .28.22.5.5.5h1.27a2.1 2.1 0 004.06 0h3.94a2.1 2.1 0 004.06 0h1.17a.5.5 0 00.5-.5V7.4a.5.5 0 00-.36-.48zM4.3 13.6a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2zM6.33 12a2.1 2.1 0 00-4.06 0H1.5V4.5h7V12H6.33zm5.97 1.6a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2zM15 12h-.67a2.1 2.1 0 00-4.06 0H9.5V6.17l5.5 1.6V12z"></path>
                          </svg>

                          <h4 className="accordion__title">
                            Shipping & Returns
                          </h4>
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p className="accordion_p">
                            Free shipping and returns available on all orders!
                            <br />
                            We ship all US domestic orders within
                            <b> 5-10 business days</b>!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <svg
                            className="icon icon-accordion color-foreground-text"
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                          >
                            <path
                              d="M5.34 1.79A1 1 0 016.32 1h3.01a1 1 0 01.98.79 2.05 2.05 0 002.9 1.4 1 1 0 011.39.6l.37 1.23a1 1 0 01-.77 1.27 2.84 2.84 0 00-.25 5.52 1 1 0 01.69 1.25l-.42 1.35a1 1 0 01-1.6.47 2.66 2.66 0 00-3.89.51 1 1 0 01-1.64 0 2.66 2.66 0 00-3.8-.6 1 1 0 01-1.55-.49l-.5-1.6a1 1 0 01.61-1.24 2.72 2.72 0 00-.17-5.16 1 1 0 01-.67-1.25l.35-1.13a1 1 0 011.29-.65 2.05 2.05 0 002.7-1.48zm-2.77 2.5A3.05 3.05 0 006.32 2h3.01a3.04 3.04 0 004.31 2.09l.38 1.22a3.83 3.83 0 00-.34 7.46l-.41 1.35a3.64 3.64 0 00-5.36.7 3.69 3.69 0 00-4.33-1.31c-.31.12-.61.29-.89.5l-.5-1.61a3.7 3.7 0 001.35-6.12 3.7 3.7 0 00-1.57-.94l.35-1.12.25.07z"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                          <h4 className="accordion__title">Materials</h4>
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p className="accordion_p">
                            Running Shoes cushions your stride with soft foam to
                            keep you running in comfort. Lightweight knit
                            material wraps your foot in breathable support,
                            while a minimalist design fits in just about
                            anywhere your day takes you.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <svg
                            className="icon icon-accordion color-foreground-text"
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                          >
                            <path
                              d="M8.86 4.38a2.78 2.78 0 013.72-.3c1.4 1.2 1.2 3.11.19 4.13L7.98 13.1c-.05.06-.1.06-.19 0L3.01 8.2a2.8 2.8 0 01.19-4.1c1.06-.9 2.7-.76 3.74.28l.96.98.96-.98zm-.96-.45l.24-.25a3.78 3.78 0 015.07-.38l.01.01v.01a3.82 3.82 0 01.26 5.59l-4.79 4.9a1.12 1.12 0 01-1.45.12l-.1-.06L2.3 8.91a3.8 3.8 0 01.26-5.57 3.79 3.79 0 015.1.33l.01.01.24.25z"
                              fillRule="evenodd"
                            ></path>
                          </svg>

                          <h4 className="accordion__title">
                            Care Instructions
                          </h4>
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p className="accordion_p">
                            Use a soft damp cloth and a drop of mild soap to
                            remove any haze. Air dry.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          <svg
                            className="icon icon-accordion color-foreground-text"
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                          >
                            <g id="Share_2">
                              <path d="M18.44,15.94a2.5,2.5,0,0,0-1.96.95L7.97,12.64a2.356,2.356,0,0,0,0-1.29l8.5-4.25a2.5,2.5,0,1,0-.53-1.54,2.269,2.269,0,0,0,.09.65l-8.5,4.25a2.5,2.5,0,1,0,0,3.08l8.5,4.25a2.269,2.269,0,0,0-.09.65,2.5,2.5,0,1,0,2.5-2.5Zm0-11.88a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,18.44,4.06ZM5.56,13.5A1.5,1.5,0,1,1,7.06,12,1.5,1.5,0,0,1,5.56,13.5Zm12.88,6.44a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,18.44,19.94Z"></path>
                            </g>
                          </svg>
                          <h4 className="share__title">Share</h4>
                        </button>
                      </h2>
                      <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <div className="linkText">link</div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="linkToCopy">
                              https://images.pexels.com/photos/15462405/pexels-photo-15462405/free-photo-of-buildings-near-canal-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
                            </span>
                            <a
                              className="text-dark d-flex justify-content-between"
                              href="javascript:void(0)"
                              onClick={() =>
                                copyToClipboard(
                                  "https://images.pexels.com/photos/15462405/pexels-photo-15462405/free-photo-of-buildings-near-canal-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                )
                              }
                            >
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* accordion */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="description_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <p>
                &quot;At vero eos et accusamus et iusto odio dignissimos ducimus
                qui blanditiis praesentium voluptatum deleniti atque corrupti
                quos dolores et quas molestias excepturi sint occaecati
                cupiditate non provident, similique sunt in culpa qui officia
                deserunt mollitia animi, id est laborum et dolorum fuga. Et
                harum quidem rerum facilis est et expedita distinctio. Nam
                libero tempore, cum soluta nobis est eligendi optio cumque nihil
                impedit quo minus id quod maxime placeat facere possimus, omnis
                voluptas assumenda est, omnis dolor repellendus. Temporibus
                autem quibusdam et aut officiis debitis aut rerum necessitatibus
                saepe eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.&ldquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="Review" className="reviews_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h5>Reviews</h5>
              <div className="reviews_inner_wrapper">
                <div className="reviews d-flex justify-content-between align-items-end">
                  <div>
                    <h4>Customer Reviews</h4>
                    <div className="d-flex gap-10 align-items-center">
                      <ReactStars
                        count={5}
                        //   onChange={ratingChanged}
                        size={24}
                        value={3}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p>Based on 8 reviews</p>
                    </div>
                  </div>
                  {orderedProduct && (
                    <div>
                      <Link>Write a review</Link>
                    </div>
                  )}
                </div>
                <div className="reviewForm py-4">
                  <h4>Write A Review</h4>
                  <form className="d-flex flex-column gap-15">
                    <div className="form-group">
                      <label className="form_label" htmlFor="">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form_label" htmlFor="">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Your Email"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form_label" htmlFor="">
                        Rating
                      </label>
                      <ReactStars
                        count={5}
                        //   onChange={ratingChanged}
                        size={24}
                        value={3}
                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form_label" htmlFor="">
                        Review Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Give your review a title"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form_label" htmlFor="">
                        Body of Review (1500)
                      </label>
                      <textarea
                        className="form-control w-100"
                        id=""
                        data-product-id=""
                        name="review[body]"
                        rows="10"
                        placeholder="Write your comments here"
                        spellCheck="false"
                        data-ms-editor="true"
                      ></textarea>
                    </div>
                    <div className="form-group d-flex justify-content-end">
                      <button type="submit" className="button border-0">
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
                <div className="allReviews mt-4">
                  <div className="cusReviews">
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mb-0">Rabbani</h6>
                      <ReactStars
                        count={5}
                        //   onChange={ratingChanged}
                        size={24}
                        value={3}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p>This is one of the best ecommerce application.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="popular_wrapper py-5 home_wrapper_2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="sectionHeading">You May Also Like</h3>
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
    </>
  );
};

export default SingleProduct;
