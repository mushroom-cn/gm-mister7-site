import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout as ALayout, Breadcrumb, MenuProps, Space, theme } from "antd";
import { FC, createElement } from "react";
import { Link, useLocation } from "react-router-dom";

const { Header } = ALayout;

const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: createElement(icon),
  label: `nav ${index + 1}`,
}));

export const LayoutHeader: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { pathname } = useLocation();
  const paths = [...pathname.split("/").filter(Boolean)];
  let preifx: string[] = [""];
  const items = paths.map((path) => {
    preifx.push(path);
    return {
      title: <Link to={preifx.join("/")}>{path}</Link>,
    };
  });
  return (
    <Header style={{ background: colorBgContainer }}>
      <Space size={"middle"}>
        <Breadcrumb separator=">" items={items} />
      </Space>
    </Header>
  );
};
