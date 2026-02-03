import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ApartmentOutlined,
  HomeOutlined,
  TeamOutlined,
  FileDoneOutlined,
  BarChartOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BellOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Space } from "antd";

const { Header, Sider, Content } = Layout;

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: "dashboard",
      icon: <HomeOutlined />,
      label: <NavLink to="/admin">Trang tổng quan</NavLink>,
    },
    {
      key: "dang-ki-ktx",
      icon: <FileDoneOutlined />,
      label: "Quản lý đăng kí KTX",
      children: [
        {
          key: "dot-dki-ktx",
          label: <NavLink to="/admin/dang-ki-ktx/dot-dki-ktx">Đợt đăng kí KTX</NavLink>,
        },
        {
          key: "duyet-don",
          label: (
            <NavLink to="/admin/dang-ki-ktx/duyet-don-ktx">Duyệt đơn đăng kí KTX</NavLink>
          ),
        },
      ],
    },
    {
      key: "phong",
      icon: <ApartmentOutlined />,
      label: "Quản lý phòng",
      // children: [
      //   {
      //     key: "phong-so-do",
      //     label: <NavLink to="/admin/phong/so-do">Sơ đồ KTX</NavLink>,
      //   },
      //   {
      //     key: "phong-toa",
      //     label: <NavLink to="/admin/phong/toa">Quản lý tòa nhà</NavLink>,
      //   },
      //   {
      //     key: "phong-tang",
      //     label: <NavLink to="/admin/phong/tang">Quản lý tầng</NavLink>,
      //   },
      //   {
      //     key: "phong-ds",
      //     label: <NavLink to="/admin/phong/danh-sach">Quản lý phòng</NavLink>,
      //   },
      // ],
    },
    {
      key: "co-so-vat-chat",
      icon: <ToolOutlined />,
      label: "Quản lý cơ sở vật chất",
      children: [
        {
          key: "csvc-ds",
          icon: <UnorderedListOutlined />,
          label: (
            <NavLink to="/admin/co-so-vat-chat">
              Danh sách cơ sở vật chất
            </NavLink>
          ),
        },
        {
          key: "csvc-pb",
          icon: <ApartmentOutlined />,
          label: (
            <NavLink to="/admin/co-so-vat-chat/phan-bo-csvc">
              Phân bổ cơ sở vật chất
            </NavLink>
          ),
        },
        {
          key: "csvc-sc",
          icon: <WarningOutlined />,
          label: (
            <NavLink to="/admin/co-so-vat-chat/sua-chua-csvc">
              Hư hỏng - Sửa chữa
            </NavLink>
          ),
        },
      ],
    },

    {
      key: "sinh-vien",
      icon: <TeamOutlined />,
      label: "Quản lý sinh viên",
      children: [
        {
          key: "sv-ds",
          label: <NavLink to="/admin/sinh-vien">Danh sách sinh viên</NavLink>,
        },
        {
          key: "sv-o",
          label: (
            <NavLink to="/admin/sinh-vien/dang-o">Sinh viên đang ở KTX</NavLink>
          ),
        },
      ],
    },

    {
      key: "dich-vu",
      icon: <FileDoneOutlined />,
      label: "Dịch vụ",
      children: [
        {
          key: "dv-chung",
          label: <NavLink to="/admin/dich-vu/chung">Dịch vụ chung</NavLink>,
        },
        {
          key: "dv-ca-nhan",
          label: <NavLink to="/admin/dich-vu/ca-nhan">Dịch vụ cá nhân</NavLink>,
        },
        {
          key: "dv-duyet",
          label: (
            <NavLink to="/admin/dich-vu/duyet">Duyệt đăng kí dịch vụ</NavLink>
          ),
        },
        {
          key: "dv-dang-dung",
          label: (
            <NavLink to="/admin/dich-vu/dang-dung">
              Danh sách dịch vụ đang dùng
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "tai-chinh",
      icon: <FileDoneOutlined />,
      label: "Quản lý tài chính",
      children: [
        {
          key: "don-gia",
          label: (
            <NavLink to="/admin/tai-chinh/don-gia">Cấu hình đơn giá</NavLink>
          ),
        },
        {
          key: "dien-nuoc",
          label: (
            <NavLink to="/admin/tai-chinh/dien-nuoc">
              Chỉ số điện - nước
            </NavLink>
          ),
        },
        {
          key: "hoa-don",
          label: <NavLink to="/admin/tai-chinh/hoa-don">Hóa Đơn</NavLink>,
        },
      ],
    },
    {
      key: "vi-pham",
      icon: <BarChartOutlined />,
      label: <NavLink to="/admin/vi-pham">Quản lý Vi phạm</NavLink>,
    },
    {
      key: "hop-dong",
      icon: <FileDoneOutlined />,
      label: "Hợp đồng",
      children: [
        {
          key: "hd-dang-hieu-luc",
          label: (
            <NavLink to="/admin/hop-dong/dang-hieu-luc">Đang hiệu lực</NavLink>
          ),
        },
        {
          key: "hd-gia-han",
          label: <NavLink to="/admin/hop-dong/gia-han">Gia hạn</NavLink>,
        },
        {
          key: "hd-lich-su",
          label: (
            <NavLink to="/admin/hop-dong/lich-su">Lịch sử hợp đồng</NavLink>
          ),
        },
      ],
    },

    {
      key: "bao-cao",
      icon: <BarChartOutlined />,
      label: <NavLink to="/admin/bao-cao">Báo cáo – Thống kê</NavLink>,
    },
  ];
  const userMenu = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
    },
    {
      key: "logout",
      label: "Đăng xuất",
    },
  ];
  const navigate = useNavigate();
  const notifications = [
    {
      id: 1,
      title: "Sinh viên đăng ký dịch vụ giặt",
      description: "SV Nguyễn Văn A – Phòng A302",
      targetUrl: "/admin/dich-vu/duyet",
      isRead: false,
    },
    {
      id: 2,
      title: "Sinh viên đăng ký KTX",
      description: "SV Trần Thị B – K64",
      targetUrl: "/admin/dang-ki-ktx/duyet-don-ktx",
      isRead: false,
    },
  ];
  
  const notificationMenu: MenuProps["items"] = notifications.map((noti) => ({
    key: noti.id,
    label: (
      <div
        onClick={() => {
          navigate(noti.targetUrl);
          // sau này gọi API markAsRead(noti.id)
        }}
        style={{ cursor: "pointer" }}
      >
        <div style={{ fontWeight: 500 }}>{noti.title}</div>
        <div style={{ fontSize: 12, color: "#888" }}>{noti.description}</div>
      </div>
    ),
  }));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div
          style={{
            height: 64,
            background: "#1677ff",
            color: "#fff",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
          }}
        >
          KÝ TÚC XÁ
        </div>

        <Menu theme="dark" mode="inline" items={items} />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ width: 64, height: 64 }}
          />

          {/* RIGHT */}
          <Space size="large">
            <SettingOutlined style={{ fontSize: 18 }} />
            {/** icon setting */}

            <Dropdown
              menu={{ items: notificationMenu }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Badge count={notifications.filter((n) => !n.isRead).length}>
                <BellOutlined style={{ fontSize: 18, cursor: "pointer" }} />
              </Badge>
            </Dropdown>

            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <Space
                align="center"
                style={{
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                <div style={{ textAlign: "right", lineHeight: 1.2 }}>
                  <div style={{ fontWeight: 500 }}>Alvin</div>
                  <div style={{ fontSize: 10, color: "#888" }}>Admin</div>
                </div>

                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#1677ff" }}
                />
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content
          style={{
            margin: 16,
            padding: 24,
            background: "#fff",
            borderRadius: 6,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
