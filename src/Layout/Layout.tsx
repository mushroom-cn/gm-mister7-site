import { FC, Fragment, createElement } from "react";
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
import { Breadcrumb, MenuProps } from "antd";
import { Layout as ALayout, Menu, theme } from "antd";
import { LayoutHeader } from "./LayoutHeader";
import { LayoutFooter } from "./LayoutFooter";
import { LayoutContent } from "./LayoutContent";
import { LayoutSider } from "./LayoutSider";

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

export const Layout: FC = () => {
  return (
    <ALayout hasSider style={{ height: "100%" }}>
      <LayoutSider />
      <ALayout className="site-layout">
        <LayoutHeader />
        <LayoutContent />
        <LayoutFooter />
      </ALayout>
    </ALayout>
  );
};
