// create privet router

import Layout from "../components/Layout.jsx";
import Blogs from "../pages/Blogs.jsx";
import Cart from "../pages/Cart.jsx";
import CheckOut from "../pages/CheckOut.jsx";
import CompareProducts from "../pages/CompareProducts.jsx";
import Contact from "../pages/Contact.jsx";
import Home from "../pages/Home.jsx";
import OurStore from "../pages/OurStore.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";
import Profile from "../pages/Profile.jsx";
import RefundPolicy from "../pages/RefundPolicy.jsx";
import ShippingPolicy from "../pages/ShippingPolicy.jsx";
import SingleBlog from "../pages/SingleBlog.jsx";
import SingleProduct from "../pages/SingleProduct.jsx";
import TermsOfService from "../pages/TermsOfService.jsx";
import Wishlist from "../pages/Wishlist.jsx";

const privetRouter = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ourStore",
        element: <OurStore />,
      },
      {
        path: "/ourStore/:id",
        element: <SingleProduct />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: <SingleBlog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/compareProduct",
        element: <CompareProducts />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/privacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/refundPolicy",
        element: <RefundPolicy />,
      },
      {
        path: "/shippingPolicy",
        element: <ShippingPolicy />,
      },
      {
        path: "/termsOfService",
        element: <TermsOfService />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkOut",
        element: <CheckOut />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
];

// export privet router

export default privetRouter;
