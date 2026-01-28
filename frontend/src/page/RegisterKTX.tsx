import React from 'react'

const RegisterKTX = () => {
  return (
    <div>
              <main className='container mt-4 ' style={{maxWidth:"900px"}}>
        <div className='card shadow p-4 rounded-5 border-0'>
          <h1 className='text-center text-primary fw-bold mb-4'>ĐĂNG KÝ Ở KÝ TÚC XÁ</h1>
        
        <form action="" className='row g-3'>
          <div className='col-12'><h2 className='fw-semibold  mt-2'>I. Thông tin cá nhân</h2></div>
          <div className='row g-3'>
            <div className='col-md-3'>
              <label htmlFor="" className='form-check-label fw-medium'>Ảnh thẻ *</label>
              <input type="file" className='form-control mb-2' />
              <div className='border rounded p-2 text-center'>
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQExIEc4WHGDuNeFVzOg4-ApAbYBR0hEAKZTR_69KiDIw7QN5C"
                  alt="preview"
                  className='img-img-fluid rounded '
                  style={{ maxHeight: "200px" , objectFit:"cover"}}
                />
              </div>
            </div>
            <div className='col-md-9'>
              <div className='row g-3'>
                <div className='col-md-6'>
                  <label className='form-check-label fw-medium'>Họ và Tên *</label>
                  <input type="text" placeholder='Nhập họ và tên' className='form-control' />
                </div>
                <div className='col-md-6'>
                  <div className='form-check-label fw-medium'>Ngày sinh *</div>
                  <input type="date" className='form-control' />
                </div>
                <div className='col-md-12'>
                  <span className='me-3 fw-medium'>Giới tính:</span>
                  <div className='form-check form-check-inline'>
                    <input type="radio" name='gender'  className='form-check-input'/>
                    <label className='form-check-label'>Nam</label>
                  </div>
                  <div className='form-check form-check-inline'>
                    <input type="radio" name='gender'  className='form-check-input'/>
                    <label className='form-check-label'>Nữ</label>
                  </div>
                </div>
                <div className='col-md-6'>
                  <label className='form-check-label fw-medium'>CCCD / CMND *</label>
                  <input type="text" placeholder='Nhập CCCD / CMND' className='form-control' />
                </div>
                <div className='col-md-6'>
                  <label className='form-check-label fw-medium'>Số điện thoại *</label>
                  <input type="tel" placeholder='Nhập số điện thoại' className='form-control' />
                </div>
                <div className='col-md-6'>
                  <label className='form-check-label fw-medium'>Email</label>
                  <input type="text" placeholder='Nhập email' className='form-control' />
                </div>
                <div className='col-md-6'>
                  <label className='form-check-label fw-medium'>Địa chỉ thường trú *</label>
                  <input type="text" placeholder='Nhập địa chỉ thường trú' className='form-control' />
                </div>
              </div>
            </div>
          </div>
          
          <div className='col-12'>
            <h2 className='fw-semibold  mt-2'>II. Thông tin học tập </h2>
          </div>
          <div className='col-md-6' >
            <label className='form-check-label fw-medium'>Tên trường *</label>
            <input type="text"  placeholder='Nhập tên trường học' className='form-control'/>
          </div>
          <div className='col-md-6'>
            <label className='form-check-label fw-medium'>Khoa / Nghành * </label>
            <input type="text"  placeholder='Nhập tên Khoa / Ngành' className='form-control'/>
          </div>
          <div className='col-md-12'>
            <label className='form-check-label fw-medium'>Mã sinh viên *</label>
            <input type="text"  placeholder='Nhập mã sinh viên' className='form-control'/>
          </div>

          <div className='col-12'>
            <h2 className='fw-semibold  mt-2'>III. Đăng ký phòng ở</h2>
          </div>
          <div className='col-12 '>
            <div className='d-flex flex-column flex-md-row align-items-md-center gap-2 gap-md-4'>
              <span className='fw-medium '>Loại phòng:</span>
              <div className='form-check m-0 '>
                <input type="radio" name='room1' className='form-check-input' />
                <label className='form-check-label'> Phòng có điều hòa</label>
              </div>
              <div className='form-check m-0 '>
                <input type="radio" name='room2' className='form-check-input' />
                <label className='form-check-label'> Phòng không có điều hòa</label>
              </div>
              </div>  
          </div>
          <div className='col-12 '>
            <div className='d-flex flex-column flex-md-row align-items-md-center gap-2 gap-md-4'>
              <span className='fw-medium'>Dịch vụ thêm:</span>
              <div className='form-check m-0'>
                <input type="checkbox" className='form-check-input' />
                <label className='form-check-label'>Máy giặt</label>
              </div>
            </div>
          </div>

          <div className='col-12'>
            <h2 className='fw-semibold  mt-2'>IV. Liên hệ khẩn </h2>
          </div>
          <div className='col-md-6'>
            <label className='form-check-label fw-medium'>Họ tên người liên hệ *</label>
            <input type="text" placeholder='Nhập họ tên người liên hệ' className='form-control' />
          </div>
          <div className='col-md-6'>
            <label className='form-check-label fw-medium'>Số điện thoại người liên hệ *</label>
            <input type="tel" placeholder='Nhập số điện thoại' className='form-control' />
          </div>

          <div className='col-12'>
            <div className='form-check '>
            <input type="checkbox" className='form-check-input' />
            <label className='form-check-label'>Tôi cam kết thông tin khai báo là đúng sự thật và chấp hành nội quy ký túc xá. <a href="" className='text-blue-500 text-sm underline'> Xem nội quy</a> </label>
          </div>
          </div>

          <div className='col-12 text-center mt-3'>
            <button type='submit' className='btn btn-primary px-5'>Gửi đăng ký</button>
          </div>
        </form>
        </div>
      </main>
    </div>
  )
}

export default RegisterKTX