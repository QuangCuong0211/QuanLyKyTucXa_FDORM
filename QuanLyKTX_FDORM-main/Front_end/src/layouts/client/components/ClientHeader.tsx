import React from 'react'
import { Link } from 'react-router-dom'

// Header chinh cua trang - logo, menu, tim kiem
const ClientHeader = () => {
  return (
    <header className="border-bottom bg-white shadow-sm">
      <div className="container py-2">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          {/* Logo - ve trang chu */}
          <Link to="/" className="fw-bold fs-5 text-primary text-decoration-none">
            FDORM
          </Link>

          {/* Menu dieu huong */}
          <nav className="d-none d-md-flex align-items-center">
            <Link to="/" className="text-decoration-none text-dark me-4">Trang chủ</Link>
            <a href="#!" className="text-decoration-none text-dark me-4">Tin tức</a>
            <a href="#!" className="text-decoration-none text-dark me-4">Giới thiệu</a>
            <a href="#!" className="text-decoration-none text-dark">Hỗ trợ</a>
          </nav>

          {/* Tim kiem + icon user */}
          <div className="d-flex align-items-center gap-2">
            <form className="d-flex align-items-center border rounded px-2 py-1" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                className="border-0 bg-transparent px-1"
                placeholder="Tìm kiếm..."
                style={{ outline: 'none', minWidth: '120px' }}
              />
              <button type="button" className="btn btn-link p-0 text-secondary" aria-label="Tim kiem">
                <img src="/images/searchicon.svg" width="18" alt="" />
              </button>
            </form>
            <Link to="/" className="d-inline-block" aria-label="Tai khoan">
              <img src="/images/user.svg" width="28" alt="User" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ClientHeader