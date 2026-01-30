import axios from 'axios';
import React, { useState } from 'react'

const RegisterKTX = () => {
  const defaultAvata = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/3840px-User-avatar.svg.png"
  const [preview, setPreview] = useState(defaultAvata)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const handleImageChange = (e: any)=>{
    const file = e.target.files[0]
    if(file){
      setImageFile(file);
      setPreview(URL.createObjectURL(file))
    }
  }
  
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    gender: "",
    cccd: "",
    phone: "",
    email: "",
    address: "",
    school: "",
    major: "",
    studentId: "",
    area: "",
    roomType: "",
    services: [] as string[],
    emergencyName: "",
    emergencyPhone: "",
    agree: false,
  })
  const [errors, setErrors] = useState<any>({});
  const validateForm = () => {
  const newErrors: any = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = "Vui lòng nhập họ tên";
  }

  if (!formData.birthDate) {
    newErrors.birthDate = "Vui lòng chọn ngày sinh";
  }

  if (!formData.gender) {
    newErrors.gender = "Vui lòng chọn giới tính";
  }

  if (!formData.cccd.trim()) {
    newErrors.cccd = "Vui lòng nhập CCCD";
  } else if (!/^\d{12}$/.test(formData.cccd)) {
    newErrors.cccd = "CCCD phải gồm 12 số";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "Vui lòng nhập số điện thoại";
  } else if (!/^(0[0-9]{9})$/.test(formData.phone)) {
    newErrors.phone = "Số điện thoại không hợp lệ";
  }

  if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email không hợp lệ";
  }

  if (!formData.address.trim()) {
    newErrors.address = "Vui lòng nhập địa chỉ";
  }

  if (!formData.school.trim()) {
    newErrors.school = "Vui lòng nhập tên trường";
  }

  if (!formData.studentId.trim()) {
    newErrors.studentId = "Vui lòng nhập mã sinh viên";
  }

  if (!formData.area) {
    newErrors.area = "Vui lòng chọn khu";
  }

  if (!formData.roomType) {
    newErrors.roomType = "Vui lòng chọn loại phòng";
  }

  if (!formData.emergencyName.trim()) {
    newErrors.emergencyName = "Vui lòng nhập người liên hệ";
  }

  if (!formData.emergencyPhone.trim()) {
    newErrors.emergencyPhone = "Vui lòng nhập SĐT người liên hệ";
  }

  if (!imageFile) {
    newErrors.avatar = "Vui lòng chọn ảnh thẻ";
  }

  if (!formData.major.trim()) {
  newErrors.major = "Vui lòng nhập ngành học";
}

  if (!formData.agree) {
  newErrors.agree = "Bạn phải đồng ý cam kết";
}

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleChange = (e: any) => {
  const { name, value, type, checked } = e.target;
  if (name === "services") {
    setFormData((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter((item) => item !== value),
    }));
    return;
  }
  if (type === "checkbox") {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = async (e: any) => {
  e.preventDefault();

  if (!validateForm()) return;

  const dataToSend = {
    ...formData,
    avatar: preview, 
  };

  try {
    const res = await axios.post(
      "http://localhost:3000/registrations",
      dataToSend
    );

    console.log("Response:", res.data);
    alert("Đăng ký thành công!");
  } catch (error) {
    console.error("Lỗi:", error);
    alert("Gửi dữ liệu thất bại!");
  }
};


// const handleSubmit = async (e: any) => {
//   e.preventDefault();

//   if (!validateForm()) return;

//   const formDataToSend = new FormData();

//   Object.keys(formData).forEach((key) => {
//     const value = (formData as any)[key];

//     if (Array.isArray(value)) {
//       formDataToSend.append(key, JSON.stringify(value));
//     } else {
//       formDataToSend.append(key, value);
//     }
//   });

//   if (imageFile) {
//     formDataToSend.append("avatar", imageFile);
//   }

//   try {
//     const res = await axios.post("http://localhost:3000/registrations",formDataToSend,
//       {headers: {"Content-Type": "multipart/form-data",},}
//     );

//     console.log("Response:", res.data);
//     alert("Đăng ký thành công!");
//   } catch (error) {
//     console.error("Lỗi:", error);
//     alert("Gửi dữ liệu thất bại!");
//   }
// };



  return (
    <div>
      <main className='container mt-4 ' style={{maxWidth:"900px"}}>
        <div className='card shadow p-4 rounded-5 border-0'>
          <h1 className='text-center text-primary fw-bold mb-4'>ĐĂNG KÝ Ở KÝ TÚC XÁ</h1>
        
        <form action="" onSubmit={handleSubmit} className='row g-3'>
          <div className='col-12'><h2 className='fw-semibold  mt-2'>I. Thông tin cá nhân</h2></div>
          <div className='row g-3'>
            <div className='col-md-3'>
              <label htmlFor="" className='form-check-label fw-medium'>Ảnh thẻ *</label>
              <input type="file" className='form-control mb-2' onChange={handleImageChange} />
              {errors.avatar && <small className="text-danger">{errors.avatar}</small>}
              <div className='border rounded p-2 text-center'>
                <img 
                  src={preview}
                  alt="preview"
                  className='img-fluid rounded '
                  style={{ height:"200px", width:"100%" , objectFit:"cover"}}
                />
              </div>
            </div>
            <div className='col-md-9'>
              <div className='row g-3'>
                <div className='col-md-6'>
                  <label className='form-check-label fw-medium'>Họ và Tên *</label>
                  <input type="text" name='fullName' value={formData.fullName} onChange={handleChange} placeholder='Nhập họ và tên' className='form-control' />
                  {errors.fullName && (<small className="text-danger">{errors.fullName}</small>)}
                </div>
                <div className='col-md-6'>
                  <div className='form-check-label fw-medium'>Ngày sinh *</div>
                  <input type="date" name='birthDate' value={formData.birthDate} onChange={handleChange} className='form-control' />
                  {errors.birthDate && <small className="text-danger">{errors.birthDate}</small>}
                </div>
                <div className='col-md-12'>
                  <span className='me-3 fw-medium'>Giới tính:</span>
                  <div className='form-check form-check-inline'>
                    <input type="radio" name='gender' value="Nam" onChange={handleChange}  className='form-check-input'/>
                    <label className='form-check-label'>Nam</label>
                  </div>
                  <div className='form-check form-check-inline'>
                    <input type="radio" name='gender' value="Nữ" onChange={handleChange}  className='form-check-input'/>
                    <label className='form-check-label'>Nữ</label>
                  </div>
                  {errors.gender && <small className="text-danger d-block">{errors.gender}</small>}
                </div>
                <div className='col-md-6'>
                  <label className='form-check-label fw-medium'>CCCD / CMND *</label>
                  <input type="text" name='cccd' value={formData.cccd} onChange={handleChange} placeholder='Nhập CCCD / CMND' className='form-control' />
                  {errors.cccd && <small className="text-danger">{errors.cccd}</small>}
                </div>
                <div className='col-md-6'>
                  <label className='form-check-label fw-medium'>Số điện thoại *</label>
                  <input type="tel" name='phone' value={formData.phone} onChange={handleChange} placeholder='Nhập số điện thoại' className='form-control' />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </div>
                <div className='col-md-6'>
                  <label className='form-check-label fw-medium'>Email</label>
                  <input type="text" name='email' value={formData.email} onChange={handleChange} placeholder='Nhập email' className='form-control' />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className='col-md-6'>
                  <label className='form-check-label fw-medium'>Địa chỉ thường trú *</label>
                  <input type="text" name='address' value={formData.address} onChange={handleChange} placeholder='Nhập địa chỉ thường trú' className='form-control' />
                  {errors.address && <small className="text-danger">{errors.address}</small>}
                </div>
              </div>
            </div>
          </div>
          
          <div className='col-12'>
            <h2 className='fw-semibold  mt-2'>II. Thông tin học tập </h2>
          </div>
          <div className='col-md-6' >
            <label className='form-check-label fw-medium'>Tên trường *</label>
            <input type="text" name='school' value={formData.school} onChange={handleChange}  placeholder='Nhập tên trường học' className='form-control'/>
            {errors.school && <small className="text-danger">{errors.school}</small>}
          </div>
          <div className='col-md-6'>
            <label className='form-check-label fw-medium'>Khoa / Nghành * </label>
            <input type="text" name='major' value={formData.major} onChange={handleChange}  placeholder='Nhập tên Khoa / Ngành' className='form-control'/>
            {errors.major && <small className="text-danger">{errors.major}</small>}
          </div>
          <div className='col-md-12'>
            <label className='form-check-label fw-medium'>Mã sinh viên *</label>
            <input type="text" name='studentId' value={formData.studentId} onChange={handleChange}  placeholder='Nhập mã sinh viên' className='form-control'/>
            {errors.studentId && <small className="text-danger">{errors.studentId}</small>}
          </div>

          <div className='col-12'>
            <h2 className='fw-semibold  mt-2'>III. Đăng ký phòng ở</h2>
          </div>
          <div className='col-12 '>
            <div className='d-flex flex-column flex-md-row align-items-md-center gap-2 gap-md-4'>
              <label htmlFor="" className='fw-medium'>Khu*</label>
              <select name="area" value={formData.area} onChange={handleChange}  className='form-select'>
                <option value="">-- Chọn khu --</option>
                <option value="A">Khu A</option>
                <option value="B">Khu B</option>
                <option value="C">Khu C</option>
              </select>
              {errors.area && <small className="text-danger">{errors.area}</small>}
            </div>
          </div>
          <div className='col-12 '>
            <div className='d-flex flex-column flex-md-row align-items-md-center gap-2 gap-md-4'>
              <span className='fw-medium '>Loại phòng *</span>
              <div className='form-check m-0 '>
                <input type="radio" name='roomType' value="6" onChange={handleChange} className='form-check-input' />
                <label className='form-check-label'> Phòng 6 người</label>
              </div>
              <div className='form-check m-0 '>
                <input type="radio" name='roomType' value="8" onChange={handleChange} className='form-check-input' />
                <label className='form-check-label'> Phòng 8 người</label>
              </div>
              {errors.roomType && <small className="text-danger d-block">{errors.roomType}</small>}
            </div>  
          </div>
          <div className='col-12 '>
            <div className='d-flex flex-column flex-md-row align-items-md-center gap-2 gap-md-4'>
              <span className='fw-medium'>Dịch vụ thêm </span>
              <div className='form-check m-0'>
                <input type="checkbox" name="services" value="Điều hòa" onChange={handleChange} className='form-check-input' />
                <label className='form-check-label'>Điều hòa</label>
              </div>
              <div className='form-check m-0'>
                <input type="checkbox" name="services" value="Máy giặt" onChange={handleChange} className='form-check-input' />
                <label className='form-check-label'>Máy giặt</label>
              </div>
            </div>
          </div>

          <div className='col-12'>
            <h2 className='fw-semibold  mt-2'>IV. Liên hệ khẩn </h2>
          </div>
          <div className='col-md-6'>
            <label className='form-check-label fw-medium'>Họ tên người liên hệ *</label>
            <input type="text" name='emergencyName' value={formData.emergencyName} onChange={handleChange} placeholder='Nhập họ tên người liên hệ' className='form-control' />
            {errors.emergencyName && <small className="text-danger">{errors.emergencyName}</small>}
          </div>
          <div className='col-md-6'>
            <label className='form-check-label fw-medium'>Số điện thoại người liên hệ *</label>
            <input type="tel" name='emergencyPhone' value={formData.emergencyPhone} onChange={handleChange} placeholder='Nhập số điện thoại' className='form-control' />
            {errors.emergencyPhone && <small className="text-danger">{errors.emergencyPhone}</small>}
          </div>

          <div className='col-12'>
            <div className='form-check'>
              <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className='form-check-input'/>
              <label className='form-check-label'>
                Tôi cam kết thông tin khai báo là đúng sự thật và chấp hành nội quy ký túc xá.
                <a href="" className='text-blue-500 text-sm underline'> Xem nội quy</a>
              </label>
              {errors.agree && <small className="text-danger d-block">{errors.agree}</small>}
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