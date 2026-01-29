// Trang dang ky o ky tuc xa - form nhap thong tin sinh vien
const KtxRegister = () => {
  return (
    <div className="bg-light min-vh-100 py-4">
      <main className="container" style={{ maxWidth: '920px' }}>
        <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
          {/* Tieu de form */}
          <div className="card-header bg-primary text-white py-3">
            <h1 className="h5 mb-0 fw-bold text-center">Đăng ký ở ký túc xá</h1>
            <p className="mb-0 small text-center opacity-90 mt-1">Vui lòng điền đầy đủ thông tin bên dưới</p>
          </div>
          <div className="card-body p-4">
            <form action="" className="row g-3">
              {/* Phan I: Thong tin ca nhan */}
              <div className="col-12">
                <h2 className="h6 fw-bold text-secondary border-bottom pb-2 mb-3">I. Thông tin cá nhân</h2>
              </div>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label fw-medium">Ảnh thẻ</label>
                  <input type="file" className="form-control form-control-sm mb-2" accept="image/*" />
                  <div className="border rounded p-2 text-center bg-white">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQExIEc4WHGDuNeFVzOg4-ApAbYBR0hEAKZTR_69KiDIw7QN5C"
                      alt="Xem truoc anh"
                      className="img-fluid rounded"
                      style={{ maxHeight: '180px', objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Họ và tên <span className="text-danger">*</span></label>
                      <input type="text" placeholder="Nhập họ và tên" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Ngày sinh <span className="text-danger">*</span></label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-medium d-block">Giới tính</label>
                      <div className="form-check form-check-inline">
                        <input type="radio" name="gender" id="gtNam" className="form-check-input" />
                        <label className="form-check-label" htmlFor="gtNam">Nam</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input type="radio" name="gender" id="gtNu" className="form-check-input" />
                        <label className="form-check-label" htmlFor="gtNu">Nữ</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">CCCD/CMND <span className="text-danger">*</span></label>
                      <input type="text" placeholder="Nhập số CCCD hoặc CMND" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Số điện thoại <span className="text-danger">*</span></label>
                      <input type="tel" placeholder="Nhập số điện thoại" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Email</label>
                      <input type="email" placeholder="Nhập email (neu co)" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Địa chỉ thường trú <span className="text-danger">*</span></label>
                      <input type="text" placeholder="Nhập địa chỉ" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Phan II: Thong tin hoc tap */}
              <div className="col-12 mt-3">
                <hr />
                <h2 className="h6 fw-bold text-secondary border-bottom pb-2 mb-3">II. Thông tin học tập</h2>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-medium">Tên trường <span className="text-danger">*</span></label>
                <input type="text" placeholder="Nhập tên trường" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-medium">Khoa / Ngành <span className="text-danger">*</span></label>
                <input type="text" placeholder="Nhập khoa hoac nganh" className="form-control" />
              </div>
              <div className="col-12">
                <label className="form-label fw-medium">Mã sinh viên <span className="text-danger">*</span></label>
                <input type="text" placeholder="Nhập ma sinh vien" className="form-control" />
              </div>

              {/* Phan III: Loai phong */}
              <div className="col-12 mt-3">
                <hr />
                <h2 className="h6 fw-bold text-secondary border-bottom pb-2 mb-3">III. Đăng ký phòng ở</h2>
              </div>
              <div className="col-12">
                <label className="form-label fw-medium d-block mb-2">Loại phòng</label>
                <div className="form-check form-check-inline">
                  <input type="radio" name="loaiPhong" id="phongAC" className="form-check-input" />
                  <label className="form-check-label" htmlFor="phongAC">Phòng có điều hòa</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" name="loaiPhong" id="phongThuong" className="form-check-input" />
                  <label className="form-check-label" htmlFor="phongThuong">Phòng thường</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input type="checkbox" id="mayGiat" className="form-check-input" />
                  <label className="form-check-label" htmlFor="mayGiat">Đăng ký thêm dịch vụ máy giặt</label>
                </div>
              </div>

              {/* Phan IV: Lien he khan */}
              <div className="col-12 mt-3">
                <hr />
                <h2 className="h6 fw-bold text-secondary border-bottom pb-2 mb-3">IV. Liên hệ khẩn cấp</h2>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-medium">Họ tên người liên hệ <span className="text-danger">*</span></label>
                <input type="text" placeholder="Ho ten nguoi than" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-medium">Số điện thoại liên hệ <span className="text-danger">*</span></label>
                <input type="tel" placeholder="So dien thoai" className="form-control" />
              </div>

              {/* Cam ket */}
              <div className="col-12 mt-2">
                <div className="form-check">
                  <input type="checkbox" id="camKet" className="form-check-input" required />
                  <label className="form-check-label small" htmlFor="camKet">
                    Tôi cam kết thông tin khai báo đúng sự thật và chấp hành nội quy ký túc xá.
                    <a href="#!" className="ms-1 text-primary">Xem nội quy</a>
                  </label>
                </div>
              </div>

              <div className="col-12 text-center mt-4">
                <button type="submit" className="btn btn-primary px-4 py-2">
                  Gửi đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default KtxRegister