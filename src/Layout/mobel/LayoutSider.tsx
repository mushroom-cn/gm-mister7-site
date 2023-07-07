import { Layout as ALayout, Button, Dropdown, Menu, Space } from 'antd';
import { FC, useMemo } from 'react';
import { useLocalStorage, useObservable, useSetState } from 'react-use';
import { entryRouter$ } from '../../routers';
import { Link } from 'react-router-dom';
import { MenuFoldOutlined } from '@ant-design/icons';
const { Sider } = ALayout;

export const LayoutSider: FC = () => {
  const routers = useObservable(entryRouter$, []);
  const [collapsed, setState] = useLocalStorage('side-bar', false);

  const items = useMemo(() => {
    return routers
      .map(({ path: basePath, label, icon, children, isHideInMenu }) => {
        if (isHideInMenu) {
          return null;
        }
        return {
          key: basePath,
          label: <Link to={{ pathname: basePath }}> {label}</Link>,
          icon,
          children: children?.length
            ? children.map(({ path, label, icon }) => {
                return {
                  key: path,
                  label: <Link to={{ pathname: path }}> {label}</Link>,
                  icon,
                  type: 'group',
                };
              })
            : null,
        };
      })
      .filter(Boolean);
  }, [routers]);

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button>
        <Space>
          <MenuFoldOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};
