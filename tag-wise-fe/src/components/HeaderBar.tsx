import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";

import { Avatar, Button, Layout, Popover, theme, Typography } from "antd";

const { Header } = Layout;

function HeaderBar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: () => void;
}) {
  const { user, logout } = useAuth0();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={setCollapsed}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <Typography.Title level={4}>TAG WISE</Typography.Title>
      <div>
        <Popover
          content={
            <a
              onClick={() =>
                logout({
                  logoutParams: { returnTo: window.location.origin },
                })
              }
            >
              Log out
            </a>
          }
          placement="bottomRight"
          trigger="click"
        >
          <Avatar
            src={user?.picture}
            size={40}
            style={{
              backgroundColor: "#87d068",
              marginRight: "20px",
            }}
            icon={<UserOutlined />}
          />
        </Popover>
      </div>
    </Header>
  );
}

export default HeaderBar;
