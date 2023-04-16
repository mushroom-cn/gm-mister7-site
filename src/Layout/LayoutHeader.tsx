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
import { Link, useLocation, useSearchParams } from "react-router-dom";

const { Header, Content, Footer, Sider } = ALayout;

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
  const items = paths.map((path) => {
    return {
      title: <Link to={path}>{path}</Link>,
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
