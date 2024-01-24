import { useState } from "react";
import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductSidebar from "../components/ProductSidebar.jsx";

const OurStore = () => {
  const title = "Our Store - Digitic";

  const [grid, setGrid] = useState(4);

  const handleGridChange = (newGrid) => {
    setGrid(newGrid);
  };

  return (
    <>
      <MetaData title={title} />
      <BreadCum title="Our Store" />

      {/* store work start */}

      <div className="store_wrapper py-5 home_wrapper_2">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12 mobileHidden">
              <ProductSidebar />
            </div>

            <div className="col-lg-9 col-md-12 col-12 ">
              <div className="filter_sort_grid mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <a
                      className="btn btn-primary"
                      data-bs-toggle="offcanvas"
                      href="#offcanvasExample1"
                      role="button"
                      aria-controls="offcanvasExample1"
                    >
                      Filter by Product
                    </a>
                  </div>

                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block" style={{ width: "100px" }}>
                      Sort By:
                    </p>
                    <select name="" className="form-control form-select" id="">
                      <option value="manual">Featured</option>
                      <option value="best-selling">Best selling</option>
                      <option value="title-ascending" selected="selected">
                        Alphabetically, A-Z
                      </option>
                      <option value="title-descending">
                        Alphabetically, Z-A
                      </option>
                      <option value="price-ascending">
                        Price, low to high
                      </option>
                      <option value="price-descending">
                        Price, high to low
                      </option>
                      <option value="created-ascending">
                        Date, old to new
                      </option>
                      <option value="created-descending">
                        Date, new to old
                      </option>
                    </select>
                  </div>

                  <div className="d-flex align-items-center gap-10 mobileHidden">
                    <p className="total_products mb-0">21 Products</p>
                    <div className="d-flex gap-10 align-items-center grid_img">
                      <img
                        onClick={() => handleGridChange(3)}
                        src="/images/gr4.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />

                      <img
                        onClick={() => handleGridChange(4)}
                        src="/images/gr3.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />

                      <img
                        onClick={() => handleGridChange(6)}
                        src="/images/gr2.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />

                      <img
                        onClick={() => handleGridChange(12)}
                        src="/images/gr.svg"
                        className="d-block img-fluid"
                        alt="grid"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="products_list pb-5">
                <div className="row">
                  <ProductCard grid={grid} />
                  <ProductCard grid={grid} />
                  <ProductCard grid={grid} />
                  <ProductCard grid={grid} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile filter */}

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample1"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Product By Filter
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ProductSidebar />
        </div>
      </div>
    </>
  );
};

export default OurStore;
