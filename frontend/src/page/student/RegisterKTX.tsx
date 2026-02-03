import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Radio, Select, Checkbox, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
const RegisterKTX = () => {

  const [form] = Form.useForm();

  const defaultAvatar =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/3840px-User-avatar.svg.png";

  const [preview, setPreview] = useState(defaultAvatar);
  const [imageFile, setImageFile] = useState<any>(null);

  const handleUpload = (file: any) => {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    return false;
  };


const onFinish = async (values: any) => {
  try {
    if (!imageFile) {
      message.error("Chưa chọn ảnh");
      return;
    }
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "birthDate") {
        formData.append(key, values.birthDate?.format("YYYY-MM-DD"));
      }
      else if (key === "services") {
        values.services?.forEach((service: string) => {
          formData.append("services", service);
        });
      }
      else {
        formData.append(key, values[key]);
      }
    });
    if (imageFile) {
      formData.append("avatar", imageFile);
    }
    await axios.post("http://localhost:3000/registerktx", formData);
    message.success("Đăng ký thành công!");
    form.resetFields();
    setPreview(defaultAvatar);
  } catch {
    message.error("Gửi dữ liệu thất bại!");
  }
};


  return (
    <main className="container mt-4" style={{ maxWidth: "900px" }}>
      <div className="card shadow p-4 rounded-5 border-0">
        <h1 className="text-center text-primary fw-bold mb-4">
          ĐĂNG KÝ Ở KÝ TÚC XÁ
        </h1>

        <Form form={form} onFinish={onFinish} layout="vertical">

          <div className="row g-3">

            <div className="col-12">
              <h2 className="fw-semibold mt-2">I. Thông tin cá nhân</h2>
            </div>

            <div className="col-md-3">
              <Form.Item
                label="Ảnh thẻ"
                name="avatar"
                valuePropName="fileList"
                getValueFromEvent={() => null}
              >
                <Upload beforeUpload={handleUpload} showUploadList={false}>
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
              </Form.Item>

              <div className="border rounded p-2 text-center mt-2">
                    <img
                      src={preview}
                      className="img-fluid rounded"
                      style={{ height: 200, width: "100%", objectFit: "cover" }}
                    />
                  </div>
            </div>

            <div className="col-md-9">
              <div className="row g-3">

                <div className="col-md-6">
                  <Form.Item
                    name="fullName"
                    label="Họ và Tên"
                    style={{ marginBottom: 8 }}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Nhập họ và tên" />
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    name="birthDate"
                    label="Ngày sinh"
                    style={{ marginBottom: 8 }}
                    rules={[{ required: true }]}
                  >
                    <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày sinh" />
                  </Form.Item>
                </div>

                <div className="col-md-12">
                  <Form.Item
                    name="gender"
                    label="Giới tính"
                    style={{ marginBottom: 8 }}
                    rules={[{ required: true }]}
                  >
                    <Radio.Group>
                      <Radio value="Nam">Nam</Radio>
                      <Radio value="Nữ">Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    name="cccd"
                    label="CCCD"
                    style={{ marginBottom: 8 }}
                    rules={[
                      { required: true },
                      { pattern: /^\d{12}$/, message: "CCCD phải 12 số" },
                    ]}
                  >
                    <Input placeholder="Nhập CCCD" />
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    style={{ marginBottom: 8 }}
                    rules={[
                      { required: true },
                      { pattern: /^0\d{9}$/, message: "SĐT không hợp lệ" },
                    ]}
                  >
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item name="email" label="Email" style={{ marginBottom: 8 }} rules={[{ type: "email" }]}>
                    <Input placeholder="Nhập Email"/>
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    name="address"
                    label="Địa chỉ thường trú"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Nhập địa chỉ thường trú"/>
                  </Form.Item>
                </div>

              </div>
            </div>

            <div className="col-12">
              <h2 className="fw-semibold mt-2">II. Thông tin học tập</h2>
            </div>

            <div className="col-md-6">
              <Form.Item name="school" label="Tên trường" style={{ marginBottom: 8 }} rules={[{ required: true }]}>
                <Input placeholder="Nhập tên trường"/>
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item name="major" label="Khoa / Ngành" style={{ marginBottom: 8 }} rules={[{ required: true }]}>
                <Input placeholder="Nhập khoa / ngành"/>
              </Form.Item>
            </div>

            <div className="col-md-12">
              <Form.Item name="studentId" label="Mã sinh viên" style={{ marginBottom: 8 }} rules={[{ required: true }]}>
                <Input placeholder="Nhập mã sinh viên"/>
              </Form.Item>
            </div>

            <div className="col-12">
              <h2 className="fw-semibold mt-2">III. Đăng ký phòng ở</h2>
            </div>

            <div className="col-12">
              <Form.Item name="area" label="Khu" style={{ marginBottom: 8 }} rules={[{ required: true }]}>
                <Select placeholder="-- Chọn khu --"
                  options={[
                      { value: "A", label: "Khu A" },
                      { value: "B", label: "Khu B" },
                      { value: "C", label: "Khu C" },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="col-12">
              <Form.Item name="roomType" label="Loại phòng" style={{ marginBottom: 8 }} rules={[{ required: true }]}>
                <Radio.Group>
                  <Radio value="6">Phòng 6 người</Radio>
                  <Radio value="8">Phòng 8 người</Radio>
                </Radio.Group>
              </Form.Item>
            </div>

            <div className="col-12">
              <Form.Item name="services" label="Dịch vụ thêm" style={{ marginBottom: 8 }}>
                <Checkbox.Group>
                  <Checkbox value="Điều hòa">Điều hòa</Checkbox>
                  <Checkbox value="Máy giặt">Máy giặt</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </div>

            <div className="col-12">
              <h2 className="fw-semibold mt-2">IV. Liên hệ khẩn cấp</h2>
            </div>

            <div className="col-md-6">
              <Form.Item name="emergencyName" label="Người liên hệ" style={{ marginBottom: 8 }} rules={[{ required: true }]}>
                <Input placeholder="Nhập tên người liên hệ"/>
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item name="emergencyPhone" label="SĐT người liên hệ" style={{ marginBottom: 8 }} rules={[{ required: true }]}>
                <Input placeholder="Nhập số điện thoại người liên hệ"/>
              </Form.Item>
            </div>

            <div className="col-12">
              <Form.Item
                name="agree"
                valuePropName="checked"
                style={{ marginBottom: 8 }}
                rules={[{ required: true, message: "Phải đồng ý cam kết" }]}
              >
                <Checkbox>
                  Tôi cam kết thông tin khai báo là đúng sự thật
                </Checkbox>
              </Form.Item>
            </div>

            <div className="col-12 text-center mt-3">
              <Button type="primary" htmlType="submit" className="px-5">
                Gửi đăng ký
              </Button>
            </div>

          </div>
        </Form>
      </div>
    </main>
  );
};

export default RegisterKTX;
