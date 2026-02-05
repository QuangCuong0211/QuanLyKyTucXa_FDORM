import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

interface MenuItem {
  path?: string;
  label: string;
  icon: string;
  children?: MenuItem[];
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // 👉 Lấy role (demo)
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ⚠️ Nếu chưa có user → dựa theo URL
  const role = user?.role || (path.startsWith("/admin") ? "admin" : "manager");

  let menu: MenuItem[] = [];

  // ================= ADMIN =================
  if (role === "admin") {
    menu = [
      { path: "/admin/dashboard", label: "Dashboard", icon: "speedometer2" },
      {
        label: "Cài đặt hệ thống",
        icon: "gear-fill",
        children: [
          {
            path: "/admin/cai-dat/quy-dinh",
            label: "Quy định KTX",
            icon: "file-text",
          },
          {
            path: "/admin/cai-dat/thong-bao",
            label: "Thông báo chung",
            icon: "bell",
          },
          // {
          //   path: "/admin/cai-dat/cau-hinh",
          //   label: "Cấu hình",
          //   icon: "sliders",
          // },
        ],
      },
      {
        path: "/admin/accounts",
        label: "Tài khoản & phân quyền",
        icon: "person-lock",
      },

      {
        path: "/admin/khu-phong",
        label: "Quản lý khu phòng",
        icon: "building-gear",
      },

      {
        path: "/admin/qly-csvc",
        label: "Quản lý CSVC",
        icon: "boxes",
      },

      {
        path: "/admin/dot-dang-ky",
        label: "Đợt đăng ký",
        icon: "calendar-check",
      },

      {
        path: "/admin/bao-cao",
        label: "Thống kê báo cáo",
        icon: "bar-chart-line",
      },

      // ⭐ MENU CHA
    ];
  }

  // ================= MANAGER =================
  else {
    menu = [
      { path: "/manager/dashboard", label: "Dashboard", icon: "speedometer2" },

      {
        path: "/manager/sinh-vien",
        label: "Quản lý sinh viên",
        icon: "people-fill",
      },

      {
        path: "/manager/phong",
        label: "Quản lý phòng",
        icon: "door-open",
      },

      {
        path: "/manager/duyet-don",
        label: "Duyệt đăng ký",
        icon: "clipboard-check",
      },

      {
        path: "/manager/csvc",
        label: "Cơ sở vật chất",
        icon: "tools",
      },

      {
        path: "/manager/vi-pham",
        label: "Vi phạm / phản ánh",
        icon: "shield-exclamation",
      },

      {
        path: "/manager/hoa-don",
        label: "Hóa đơn",
        icon: "receipt",
      },

      {
        path: "/manager/thong-ke",
        label: "Thống kê",
        icon: "bar-chart",
      },
    ];
  }

  // ================= UI =================
  return (
    <div
      className="bg-dark text-white d-flex flex-column"
      style={{
        width: collapsed ? 80 : 260,
        minHeight: "100vh",
        transition: "0.3s",
      }}
    >
      {/* Toggle Sidebar */}
      <div className="d-flex justify-content-end p-2 border-bottom border-secondary">
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setCollapsed(!collapsed)}
        >
          <i
            className={`bi ${
              collapsed ? "bi-chevron-right" : "bi-chevron-left"
            }`}
          ></i>
        </button>
      </div>

      {/* MENU */}
      <div className="list-group list-group-flush">
        {menu.map((item) => {
          // ===== MENU CHA =====
          if (item.children) {
            const isOpen =
              openMenu === item.label ||
              item.children.some((child) => path.startsWith(child.path!));

            return (
              <div key={item.label}>
                {/* Parent */}
                <div
                  onClick={() =>
                    setOpenMenu(openMenu === item.label ? null : item.label)
                  }
                  className="list-group-item border-0 d-flex align-items-center gap-2"
                  style={{
                    background: isOpen ? "#0d6efd" : "#212529",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <i className={`bi bi-${item.icon}`} />

                  {!collapsed && (
                    <>
                      <span>{item.label}</span>

                      <i
                        className={`bi ms-auto ${
                          isOpen ? "bi-chevron-up" : "bi-chevron-down"
                        }`}
                      />
                    </>
                  )}
                </div>

                {/* CHILDREN */}
                {isOpen &&
                  !collapsed &&
                  item.children.map((child) => {
                    const childActive = path.startsWith(child.path!);

                    return (
                      <Link
                        key={child.path}
                        to={child.path!}
                        className="list-group-item border-0 d-flex align-items-center gap-2"
                        style={{
                          paddingLeft: 50,
                          background: childActive ? "#0d6efd" : "#2c3034",
                          color: "white",
                        }}
                      >
                        <i className={`bi bi-${child.icon}`} />
                        {child.label}
                      </Link>
                    );
                  })}
              </div>
            );
          }

          // ===== MENU THƯỜNG =====
          const isActive = path.startsWith(item.path!);
          
          return (
            <Link
              key={item.path}
              to={item.path!}
              className="list-group-item border-0 d-flex align-items-center gap-2"
              style={{
                background: isActive ? "#0d6efd" : "#212529",
                color: "white",
              }}
            >
              <i className={`bi bi-${item.icon}`} />

              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* USER */}
      <div className="mt-auto border-top border-secondary p-3 d-flex align-items-center gap-2">
        <i className="bi bi-person-circle" style={{ fontSize: 26 }}></i>

        {!collapsed && (
          <div>
            <div style={{ fontWeight: 600 }}>{user?.name || role}</div>

            <small className="text-secondary">{role} Online</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
