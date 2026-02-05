import React from "react";
import logo from "../assets/logo-2.png";

const Header: React.FC = () => {
  return (
    <nav
      className="navbar navbar-dark"
      style={{
        backgroundColor: "#F8F8FF",
        height: "80px",
        padding: "0 20px", // bỏ px-3 vì làm logo nhỏ lại
      }}
    >
      {/* LOGO */}
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            height: 100,   // gần full navbar
            width: 215,
            objectFit: "contain",
          }}
        />
      </div>

      {/* RIGHT */}
      <div className="d-flex align-items-center">
        <button className="btn btn-danger">Đăng xuất</button>
      </div>
    </nav>
  );
};

export default Header;
