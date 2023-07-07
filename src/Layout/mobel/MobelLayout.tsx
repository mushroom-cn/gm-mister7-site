import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout as ALayout, MenuProps } from 'antd';
import { FC, createElement } from 'react';
import { LayoutContent } from '../desktop/LayoutContent';
import { LayoutSider } from './LayoutSider';

const items: MenuProps['items'] = [
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

export const MobelLayout: FC = () => {
  return (
    <ALayout style={{ height: '100%', width: '100%' }}>
      <LayoutSider />
      <ALayout className="site-layout">
        <LayoutContent />
      </ALayout>
    </ALayout>
  );
};
