import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

interface MenuItem { path?: string; label: string; icon: string; children?: MenuItem[] }

const MENUS: Record<string, MenuItem[]> = {
  admin: [
    { path: "/admin/dashboard", label: "Dashboard", icon: "speedometer2" },
    {
      label: "Cài đặt hệ thống", icon: "gear-fill", children: [
        { path: "/admin/cai-dat/quy-dinh", label: "Quy định KTX", icon: "file-text" },
        { path: "/admin/cai-dat/thong-bao", label: "Thông báo chung", icon: "bell" },
      ],
    },
    { path: "/admin/accounts", label: "Tài khoản & phân quyền", icon: "person-lock" },
    { path: "/admin/khu-phong", label: "Quản lý khu phòng", icon: "building-gear" },
    { path: "/admin/qly-csvc", label: "Quản lý CSVC", icon: "boxes" },
    { path: "/admin/dot-dang-ky", label: "Đợt đăng ký", icon: "calendar-check" },
    { path: "/admin/bao-cao", label: "Thống kê báo cáo", icon: "bar-chart-line" },
  ],
  manager: [
    { path: "/manager/dashboard", label: "Dashboard", icon: "speedometer2" },
    { path: "/manager/students", label: "Quản lý sinh viên", icon: "people-fill" },
    { path: "/manager/areas", label: "Quản lý khu vực", icon: "map" },
    { path: "/manager/rooms", label: "Quản lý phòng", icon: "door-open" },
    { path: "/manager/duyet-don", label: "Duyệt đăng ký", icon: "clipboard-check" },
    { path: "/manager/csvc", label: "Cơ sở vật chất", icon: "tools" },
    { path: "/manager/vi-pham", label: "Vi phạm / phản ánh", icon: "shield-exclamation" },
    { path: "/manager/hoa-don", label: "Hóa đơn", icon: "receipt" },
    { path: "/manager/thong-ke", label: "Thống kê", icon: "bar-chart" },
  ],
};

export default function Sidebar() {
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role || (pathname.startsWith("/admin") ? "admin" : "manager");

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menu = MENUS[role];

  return (
    <div className="bg-dark text-white d-flex flex-column" style={{ width: collapsed ? 80 : 260, minHeight: "100vh", transition: "0.3s" }}>
      <div className="d-flex justify-content-end p-2 border-bottom border-secondary">
        <button className="btn btn-sm btn-outline-light" onClick={() => setCollapsed(!collapsed)}>
          <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"}`} />
        </button>
      </div>

      <div className="list-group list-group-flush">
        {menu.map(item => {
          if (item.children) {
            const isOpen = openMenu === item.label || item.children.some(c => pathname.startsWith(c.path!));
            return (
              <div key={item.label}>
                <div onClick={() => setOpenMenu(isOpen ? null : item.label)}
                  className="list-group-item border-0 d-flex align-items-center gap-2"
                  style={{ background: isOpen ? "#0d6efd" : "#212529", cursor: "pointer" }}>
                  <i className={`bi bi-${item.icon}`} />
                  {!collapsed && <>
                    <span>{item.label}</span>
                    <i className={`bi ms-auto ${isOpen ? "bi-chevron-up" : "bi-chevron-down"}`} />
                  </>}
                </div>

                {isOpen && !collapsed && item.children.map(c => (
                  <Link key={c.path} to={c.path!}
                    className="list-group-item border-0 d-flex align-items-center gap-2"
                    style={{ paddingLeft: 50, background: pathname.startsWith(c.path!) ? "#0d6efd" : "#2c3034", color: "white" }}>
                    <i className={`bi bi-${c.icon}`} />{c.label}
                  </Link>
                ))}
              </div>
            );
          }

          return (
            <Link key={item.path} to={item.path!}
              className="list-group-item border-0 d-flex align-items-center gap-2"
              style={{ background: pathname.startsWith(item.path!) ? "#0d6efd" : "#212529", color: "white" }}>
              <i className={`bi bi-${item.icon}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto border-top border-secondary p-3 d-flex align-items-center gap-2">
        <i className="bi bi-person-circle fs-4" />
        {!collapsed && <div><div className="fw-semibold">{user?.name || role}</div><small className="text-secondary">{role} Online</small></div>}
      </div>
    </div>
  );
}
