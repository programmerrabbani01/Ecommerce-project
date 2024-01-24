import { MdArrowOutward } from "react-icons/md";
import { FiArrowDownRight } from "react-icons/fi";
import { Table } from "antd";
import MetaData from "../components/HelmetData/MetaData.jsx";
import { Column } from "@ant-design/plots";

// table data
const columns = [
  {
    title: "S.No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
  const title = "Dashboard - Digitic";

  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "Jul",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sep",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: () => {
      return "#d50101";
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  return (
    <>
      <MetaData title={title} />

      {/*  */}

      <h3 className="mb-4 title">Dashboard</h3>

      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex flex-grow-1 justify-content-between align-items-end  bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total</p>
            <h3 className="mb-0 sub_title">$100</h3>
          </div>
          <div className="text-end">
            <h6 className="green">
              <MdArrowOutward /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>

        <div className="d-flex flex-grow-1 justify-content-between align-items-end  bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total</p>
            <h3 className="mb-0 sub_title">$100</h3>
          </div>
          <div className="text-end">
            <h6 className="red">
              <FiArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-items-end  bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total</p>
            <h3 className="mb-0 sub_title">$100</h3>
          </div>
          <div className="text-end">
            <h6 className="green">
              <MdArrowOutward /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table dataSource={data1} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
