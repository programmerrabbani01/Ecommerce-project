import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CiShoppingCart, CiShoppingTag } from "react-icons/ci";
import {
  IoIosAddCircleOutline,
  IoIosNotificationsOutline,
} from "react-icons/io";
import { LuUsers2 } from "react-icons/lu";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineColorLens } from "react-icons/md";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { RiPhoneFindLine } from "react-icons/ri";
import {} from "react-icons/io";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../features/auth/authApiSlice.js";
import { SiCoinmarketcap } from "react-icons/si";
import { RiCoupon4Line } from "react-icons/ri";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleUserLogOut = (e) => {
    e.preventDefault();

    dispatch(logOutUser());
  };

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical">
            <h2 className="fs-5 text-center py-4 mb-0">
              <span className="sm_logo text-white">FM</span>
              <span className="lg_logo text-white">FLASHMART</span>
            </h2>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key == "signOut") {
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "",
                icon: <MdOutlineDashboardCustomize className="fs-5" />,
                label: "Dashboard ",
              },
              {
                key: "/customers",
                icon: <LuUsers2 className="fs-5" />,
                label: "Customers ",
              },
              {
                key: "catalog",
                icon: <CiShoppingCart className="fs-5" />,
                label: "Catalog",
                children: [
                  {
                    key: "/addProduct",
                    icon: <IoIosAddCircleOutline className="fs-5" />,
                    label: "Add Product",
                  },
                  {
                    key: "/products",
                    icon: <FaClipboardList className="fs-5" />,
                    label: "Products",
                  },
                  {
                    key: "/category",
                    icon: <BiCategoryAlt className="fs-5" />,
                    label: "Add Category",
                  },
                  {
                    key: "/categoryList",
                    icon: <FaClipboardList className="fs-5" />,
                    label: "Category List",
                  },
                  {
                    key: "/brand",
                    icon: <SiBrandfolder className="fs-5" />,
                    label: "Add Brand",
                  },
                  {
                    key: "/brandList",
                    icon: <FaClipboardList className="fs-5" />,
                    label: "Brand List",
                  },
                  {
                    key: "/tag",
                    icon: <CiShoppingTag className="fs-5" />,
                    label: "Add Tag",
                  },
                  {
                    key: "/tagList",
                    icon: <FaClipboardList className="fs-5" />,
                    label: "Tag List",
                  },
                  {
                    key: "/color",
                    icon: <MdOutlineColorLens className="fs-5" />,
                    label: "Add Color",
                  },
                  {
                    key: "/colorList",
                    icon: <FaClipboardList className="fs-5" />,
                    label: "Color List",
                  },
                ],
              },
              {
                key: "/orders",
                icon: <FaClipboardList className="fs-5" />,
                label: "Orders",
              },
              {
                key: "marketing",
                icon: <SiCoinmarketcap className="fs-5" />,
                label: "Marketing",
                children: [
                  {
                    key: "/addCoupon",
                    icon: <IoIosAddCircleOutline className="fs-5" />,
                    label: "Add Coupon",
                  },
                  {
                    key: "/couponList",
                    icon: <RiCoupon4Line className="fs-5" />,
                    label: "Coupon List",
                  },
                ],
              },
              {
                key: "blogs",
                icon: <FaBloggerB className="fs-5" />,
                label: "Blogs",
                children: [
                  {
                    key: "/addBlog",
                    icon: <IoIosAddCircleOutline className="fs-5" />,
                    label: "Add Blog",
                  },
                  {
                    key: "/blogList",
                    icon: <FaClipboardList className="fs-5" />,
                    label: "Blog List",
                  },
                  {
                    key: "/addBlogCategory",
                    icon: <IoIosAddCircleOutline className="fs-5" />,
                    label: "Add Blog Category",
                  },
                  {
                    key: "/blogCategoryList",
                    icon: <FaClipboardList className="fs-5" />,
                    label: "Blog Category List",
                  },
                ],
              },

              {
                key: "/enquires",
                icon: <RiPhoneFindLine className="fs-5" />,
                label: "Enquiries",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="d-flex justify-content-between align-items-center pe-5"
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="d-flex gap-4 align-items-center">
              <div className="position-relative">
                <IoIosNotificationsOutline className="notificationIcon fs-4" />
                <span
                  className="badge rounded-circle p-1 position-absolute"
                  style={{ backgroundColor: "#d50101" }}
                >
                  3
                </span>
              </div>
              <div className="d-flex gap-3 align-items-center dropdown">
                <div>
                  <img
                    src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                    alt=""
                    className="topImg"
                  />
                </div>
                <div
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <h5 className="mb-0">Rabbani</h5>
                  <p className="mb-0">rabbani@gmail.com</p>
                </div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      to="#"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item py-1 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      to="#"
                      onClick={handleUserLogOut}
                    >
                      Sign Out
                    </Link>
                  </li>
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
