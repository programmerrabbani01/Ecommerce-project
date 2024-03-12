import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsData,
  setMessageEmpty,
} from "../features/product/productSlice.js";
import { useEffect } from "react";
import { createToaster } from "../utils/toastify.js";
import {
  deleteProducts,
  getAllProducts,
} from "../features/product/productApiSlice.js";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import swal from "sweetalert";

// table data
const columns = [
  {
    title: "S.No",
    dataIndex: "key",
  },
  {
    title: "Photo",
    dataIndex: "photos",
  },
  {
    title: "Name",
    dataIndex: "title",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  // {
  //   title: "Category",
  //   dataIndex: "categories",
  //   sorter: (a, b) => a.categories.length - b.categories.length,
  // },
  // {
  //   title: "Tag",
  //   dataIndex: "tags",
  // },
  // {
  //   title: "Color",
  //   dataIndex: "colors",
  // },
  {
    title: "Regular Price",
    dataIndex: "regularPrice",
  },
  {
    title: "Sale Price",
    dataIndex: "salePrice",
  },
  // {
  //   title: "Size",
  //   dataIndex: "size",
  // },

  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Products = () => {
  const title = "Products - FLASHMART";

  const dispatch = useDispatch();

  const { products, error, message } = useSelector(getAllProductsData);

  // handle product delete

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // delete products
  const handleProductDelete = (id) => {
    if (id) {
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deleteProducts(id));
          // swal("Proof! Your Imaginary File Has Been Deleted", {
          //   icon: "success",
          // });
        } else {
          swal("Your Imaginary File Is Safe!");
        }
      });
    }
  };

  let tableData = [];

  if (Array.isArray(products)) {
    const data1 = products?.map((product, index) => ({
      key: index + 1,
      title: product?.title,
      photos: (
        <>
          {Array.isArray(product?.photos) && product?.photos[0] && (
            <img className="productImage" src={product?.photos[0].url} alt="" />
          )}
        </>
      ),

      brand: product?.brand,
      categories: product?.categories,
      // tags: (
      //   <>
      //     {product?.tags?.map((item, index) => {
      //       return (
      //         <ul
      //           key={index}
      //           style={{ listStyle: "none", margin: "0px", padding: "0px" }}
      //         >
      //           <li>{item?.name}</li>
      //         </ul>
      //       );
      //     })}
      //   </>
      // ),
      // colors: (
      //   <>
      //     {product?.colors?.map((item, index) => {
      //       return (
      //         <ul
      //           key={index}
      //           style={{ listStyle: "none", margin: "0px", padding: "0px" }}
      //         >
      //           <li>{item?.name}</li>
      //         </ul>
      //       );
      //     })}
      //   </>
      // ),
      regularPrice: `${product?.regularPrice}`,
      salePrice: `${product?.salePrice}`,
      // size: (
      //   <>
      //     {product?.size?.map((item, index) => {
      //       return (
      //         <ul
      //           key={index}
      //           style={{ listStyle: "none", margin: "0px", padding: "0px" }}
      //         >
      //           <li>{item?.name}</li>
      //         </ul>
      //       );
      //     })}
      //   </>
      // ),
      quantity: `${product?.quantity}`,
      action: (
        <>
          <Link to={`/products/${product?._id}`} className=" fs-5 text-danger">
            <FaEdit />
          </Link>
          <Link
            to=""
            className="ms-3 fs-5 text-danger"
            onClick={() => handleProductDelete(product._id)}
          >
            <FaRegTrashAlt />
          </Link>
        </>
      ),
    }));

    tableData.push(...data1);
  }

  // messages

  useEffect(() => {
    if (error) {
      createToaster(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table dataSource={tableData} columns={columns} />
      </div>
    </>
  );
};

export default Products;
