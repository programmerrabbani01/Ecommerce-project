import MainLayout from "../components/Layout/MainLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Enquires from "../pages/Enquires.jsx";
import BlogCategoryList from "../pages/BlogCategoryList.jsx";
import BlogList from "../pages/BlogList.jsx";
import BrandList from "../pages/BrandList.jsx";
import CategoryList from "../pages/CategoryList.jsx";
import ColorList from "../pages/ColorList.jsx";
import Customers from "../pages/Customers.jsx";
import Orders from "../pages/Orders.jsx";
import Products from "../pages/Products.jsx";
import TagList from "../pages/TagList.jsx";
import AddBlog from "../pages/AddBlog.jsx";
import AddBlogCategory from "../pages/AddBlogCategory.jsx";
import AddColor from "../pages/AddColor.jsx";
import AddCategory from "../pages/AddCategory.jsx";
import AddBrand from "../pages/AddBrand.jsx";
import AddTag from "../pages/AddTag.jsx";
import AddProduct from "../pages/AddProduct.jsx";
import PrivateGard from "./PrivateGard.jsx";
import AddCoupon from "../pages/AddCoupon.jsx";
import Coupons from "../pages/Coupons.jsx";
import EditBrand from "../pages/EditBrand.jsx";
import EditTag from "../pages/EditTag.jsx";
import EditCategory from "../pages/EditCategory.jsx";
import EditColor from "../pages/EditColor.jsx";
import EditBlog from "../pages/EditBlog.jsx";
import EditBlogCategory from "../pages/EditBlogCategory.jsx";
import EditCoupon from "../pages/EditCoupon.jsx";
import EnquiresView from "../pages/EnquiresView.jsx";

// create private router

const PrivateRouter = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <PrivateGard />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/enquires",
            element: <Enquires />,
          },
          {
            path: "/enquires/:id",
            element: <EnquiresView />,
          },
          {
            path: "/blogCategoryList",
            element: <BlogCategoryList />,
          },
          {
            path: "/blogList",
            element: <BlogList />,
          },
          {
            path: "/couponList",
            element: <Coupons />,
          },
          {
            path: "/brandList",
            element: <BrandList />,
          },
          {
            path: "/categoryList",
            element: <CategoryList />,
          },
          {
            path: "/category/:id",
            element: <EditCategory />,
          },
          {
            path: "/colorList",
            element: <ColorList />,
          },
          {
            path: "/customers",
            element: <Customers />,
          },
          {
            path: "/orders",
            element: <Orders />,
          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/tagList",
            element: <TagList />,
          },
          {
            path: "/tag/:id",
            element: <EditTag />,
          },
          {
            path: "/blog",
            element: <AddBlog />,
          },
          {
            path: "/blog/:id",
            element: <EditBlog />,
          },
          {
            path: "/coupon",
            element: <AddCoupon />,
          },
          {
            path: "/coupon/:id",
            element: <EditCoupon />,
          },
          {
            path: "/blogCategory",
            element: <AddBlogCategory />,
          },
          {
            path: "/blogCategory/:id",
            element: <EditBlogCategory />,
          },
          {
            path: "/color",
            element: <AddColor />,
          },
          {
            path: "/color/:id",
            element: <EditColor />,
          },
          {
            path: "/category",
            element: <AddCategory />,
          },
          {
            path: "/brand",
            element: <AddBrand />,
          },
          {
            path: "/brand/:id",
            element: <EditBrand />,
          },
          {
            path: "/tag",
            element: <AddTag />,
          },
          {
            path: "/addProduct",
            element: <AddProduct />,
          },
        ],
      },
    ],
  },
];

// export public router

export default PrivateRouter;
