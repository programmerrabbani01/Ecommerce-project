import BreadCum from "../components/BreadCum.jsx";
import MetaData from "../components/MetaData.jsx";

const ShippingPolicy = () => {
  const title = "Shipping Policy - Digitic";
  return (
    <>
      <MetaData title={title} />
      <BreadCum title="Shipping Policy" />

      {/* ShippingPolicy start */}

      <div className="shipping_wrapper home_wrapper_2 py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="policy"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
