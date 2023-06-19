import { Layout as ALayout, theme } from "antd";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useObservable } from "react-use";
import { entryRouter$ } from "../routers";

const { Content } = ALayout;

export const LayoutContent: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const routers = useObservable(entryRouter$, []);
  return (
    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
      <div
        style={{
          padding: 24,
          background: colorBgContainer,
          height: "100%",
        }}
      >
        <Routes>
          {routers.map(({ path, component, isDefault }) => {
            return (
              <Route
                key={path}
                path={path}
                Component={component}
                index={isDefault}
              />
            );
          })}
        </Routes>
      </div>
    </Content>
  );
};
