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
import { Layout as ALayout, MenuProps, theme } from 'antd';
import { FC, createElement } from 'react';
import { useTranslation } from 'react-i18next';
const { Footer } = ALayout;

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

export const LayoutFooter: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { t } = useTranslation();
  return (
    <Footer style={{ textAlign: 'center' }}>
      {t('©2023 Created by GMM7')}
    </Footer>
  );
};
