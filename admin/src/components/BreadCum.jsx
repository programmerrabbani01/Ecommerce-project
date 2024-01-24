import { Link } from "react-router-dom";

const BreadCum = (props) => {
  const { title } = props;
  return (
    <>
      <div className="breadCum py-4 mb-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 d-flex justify-content-center align-items-center">
                <Link
                  to="/"
                  className="text-dark"
                  style={{ marginRight: "5px" }}
                >
                  Home
                </Link>
                / <div className="breadcrumb_title">{title}</div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCum;
