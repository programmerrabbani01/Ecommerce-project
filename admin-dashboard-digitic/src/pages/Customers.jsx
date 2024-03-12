import { Image, Modal, Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllCustomersData,
  setMessageEmpty,
} from "../features/customer/userSlice.js";
import { createToaster } from "../utils/toastify.js";
import { getAllUser } from "../features/customer/userApiSlice.js";
import { Link } from "react-router-dom";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";

const columns = [
  {
    title: "S.No",
    dataIndex: "key",
  },
  {
    title: "Photo",
    dataIndex: "photo",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Customers = () => {
  const title = "Customers - FLASHMART";
  const dispatch = useDispatch();
  const { users, error, message } = useSelector(getAllCustomersData);

  const [modalData, setModalData] = useState(null);

  const showModal = (data) => {
    setModalData(data);
  };

  const handleCancel = () => {
    setModalData(null);
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const customerData = users?.map((data, index) => ({
    key: index + 1,
    name: `${data?.firstName?.toUpperCase()} ${data?.lastName?.toUpperCase()}`,
    photo: (
      <img
        className="tablePhoto"
        src={data.photo ? data.photo?.url : `https://i.ibb.co/Lvd1G5h/user.jpg`}
        alt=""
      />
    ),
    email: data.email,
    mobile: data.mobile ? data.mobile : "null",
    action: (
      <>
        <Link
          to="#"
          onClick={() => showModal(data)}
          className="fs-3 text-danger"
        >
          <FaEye />
        </Link>
        <Link className="ms-3 fs-3 text-danger" to="#">
          <FaRegTrashAlt />
        </Link>
      </>
    ),
  }));

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
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table dataSource={customerData} columns={columns} />
        <Modal
          title="Customer"
          footer={null}
          visible={modalData !== null}
          onCancel={handleCancel}
        >
          {modalData && (
            <div>
              <Image
                width={"100%"}
                src={
                  modalData.photo
                    ? modalData.photo?.url
                    : `https://i.ibb.co/Lvd1G5h/user.jpg`
                }
              />
              <div>
                <br />
                <p>First Name : {modalData?.firstName?.toUpperCase()}</p>
                <p>Last Name :{modalData?.lastName?.toUpperCase()}</p>
                <p>Email : {modalData.email} </p>
                <p>Mobile : {modalData.mobile} </p>
                <p>Gender : {modalData.gender} </p>
                <p>Role : {modalData.role} </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Customers;
