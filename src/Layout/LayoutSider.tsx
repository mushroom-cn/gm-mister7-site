import { Layout as ALayout, Menu } from 'antd';
import { FC, useMemo } from 'react';
import { useObservable } from 'react-use';
import { entryRouter$ } from '../routers';
import { Link } from 'react-router-dom';

const { Sider } = ALayout;

export const LayoutSider: FC = () => {
  const routers = useObservable(entryRouter$, []);

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
    <Sider style={{}}>
      <div
        style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
      />
    </Sider>
  );
};
