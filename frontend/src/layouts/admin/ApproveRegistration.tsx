import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  message,
  Image,
  Card,
  Modal,
  Typography,
  Popconfirm,
  Row,
  Col,
  Divider,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UserOutlined,
  IdcardOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ReadOutlined,
  HomeOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

interface Registration {
  _id: string;
  fullName: string;
  birthDate: string;
  gender: string;
  cccd: string;
  phone: string;
  email: string;
  address: string;
  school: string;
  major: string;
  studentId: string;
  area: string;
  roomType: string;
  services: string[];
  emergencyName: string;
  emergencyPhone: string;
  avatar: string;
  status?: string;
}

const ApproveRegistration: React.FC = () => {
  const [data, setData] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Registration | null>(null);

  const API_REGISTER = "http://localhost:3000/api/registerktx";

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_REGISTER);
      const registrations = Array.isArray(res.data) ? res.data : res.data?.data || [];
      
      // Chỉ hiển thị đơn chờ duyệt
      const pending = registrations.filter((r: Registration) => 
        !r.status || r.status === "pending"
      );
      
      setData(pending);
    } catch (error) {
      console.error("Lỗi fetch registrations:", error);
      message.error("Không thể tải danh sách đăng ký từ MongoDB!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const showDetails = (record: Registration) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const handleReject = async (id: string) => {
    console.log("Đang xóa đơn với _id:", id);
    try {
      await axios.delete(`${API_REGISTER}/${id}`);
      message.success("Đã từ chối và xóa đơn đăng ký khỏi hệ thống!");
      setData(data.filter((item) => item._id !== id));
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Lỗi xóa:", error.response?.data || error.message);
      message.error("Lỗi khi xóa đơn! Kiểm tra console.");
    }
  };

  const handleApprove = async (record: Registration) => {
  try {
    const response = await axios.patch(
      `${API_REGISTER}/${record._id}`,          // ← sửa về đây
      { status: "approved" }                    // gửi status approved
    );

    console.log("Phê duyệt thành công:", response.data);

    message.success(`Đã phê duyệt ${record.fullName} → Khu ${record.area}`);

    // Xóa khỏi danh sách chờ duyệt
    setData((prev) => prev.filter((item) => item._id !== record._id));

    setIsModalOpen(false);
  } catch (error: any) {
    console.error("Lỗi duyệt:", error.response?.data || error);
    message.error(
      error.response?.data?.message || "Lỗi khi duyệt đơn!"
    );
  }
};

  const getFullImageUrl = (path: string) => {
    if (!path) return "https://via.placeholder.com/220x293?text=No+Avatar";
    if (path.startsWith("http")) return path;
    const cleanPath = path.replace(/^\/src\//, "").replace(/^\//, "");
    return `http://localhost:3000/${cleanPath}`;
  };

  const columns: ColumnsType<Registration> = [
    {
      title: "Ảnh",
      dataIndex: "avatar",
      width: 100,
      render: (img) => (
        <Image
          src={getFullImageUrl(img)}
          width={60}
          height={75}
          style={{ objectFit: "cover", borderRadius: 6, border: "1px solid #f0f0f0" }}
          fallback="https://via.placeholder.com/60x75?text=No+Img"
          preview={false}
        />
      ),
    },
    {
      title: "Thông tin sinh viên",
      render: (_, r) => (
        <Space  size={0}>
          <Text strong style={{ fontSize: "15px" }}>
            {r.fullName}
          </Text>
          <Tag color="blue">MSSV: {r.studentId}</Tag>
        </Space>
      ),
    },
    {
      title: "Nguyện vọng nội trú",
      render: (_, r) => (
        <Space  size={2}>
          <Tag icon={<HomeOutlined />} color="cyan">
            Khu {r.area}
          </Tag>
          <Text type="secondary">Phòng {r.roomType} người</Text>
        </Space>
      ),
    },
    {
      title: "Thao tác",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => showDetails(record)}>
            Chi tiết
          </Button>

          <Popconfirm title="Phê duyệt đơn này?" onConfirm={() => handleApprove(record)}>
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
            >
              Đồng ý
            </Button>
          </Popconfirm>

          <Popconfirm title="Từ chối & Xóa đơn này?" onConfirm={() => handleReject(record._id)}>
            <Button danger icon={<CloseCircleOutlined />}>
              Từ chối
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card  className="shadow-sm">
      <Title level={3} style={{ marginBottom: 24, color: "#1677ff" }}>
        Danh sách đơn đăng ký chờ duyệt
      </Title>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 7 }}
      />

      {/* MODAL CHI TIẾT */}
      <Modal
        title={<span style={{ fontSize: 18, color: "#1677ff" }}>HỒ SƠ ĐĂNG KÝ NỘI TRÚ</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
        centered
        footer={[
          <Button key="close" size="large" onClick={() => setIsModalOpen(false)}>
            Đóng
          </Button>,
          <Popconfirm
            key="rej"
            title="Xóa đơn này?"
            onConfirm={() => selectedUser && handleReject(selectedUser._id)}
          >
            <Button size="large" danger icon={<CloseCircleOutlined />}>
              Từ chối
            </Button>
          </Popconfirm>,
          <Button
            key="app"
            size="large"
            type="primary"
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a", height: "auto", padding: "8px 24px" }}
            icon={<CheckCircleOutlined />}
            onClick={() => selectedUser && handleApprove(selectedUser)}
          >
            Đồng ý phê duyệt
          </Button>,
        ]}
      >
        {selectedUser && (
          <div style={{ padding: "12px 0" }}>
            <Row gutter={[32, 32]}>
              {/* CỘT TRÁI: AVATAR */}
              <Col xs={24} md={8}>
                <div
                  style={{
                    textAlign: "center",
                    padding: "24px",
                    background: "#f8f9fa",
                    borderRadius: "16px",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <Image
                    src={getFullImageUrl(selectedUser.avatar)}
                    style={{
                      width: "100%",
                      maxWidth: "220px",
                      aspectRatio: "3/4",
                      objectFit: "cover",
                      borderRadius: "12px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    }}
                    fallback="https://via.placeholder.com/220x293?text=No+Avatar"
                    preview={false}
                  />
                  <Title
                    level={4}
                    style={{ marginTop: "20px", marginBottom: "8px", color: "#1a1a1a" }}
                  >
                    {selectedUser.fullName.toUpperCase()}
                  </Title>
                  <Tag
                    color="geekblue"
                    style={{ fontSize: "14px", padding: "4px 12px", borderRadius: "20px" }}
                  >
                    {selectedUser.studentId}
                  </Tag>
                </div>
              </Col>

              {/* CỘT PHẢI: THÔNG TIN CHI TIẾT */}
              <Col xs={24} md={16}>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* PHẦN 1: THÔNG TIN CÁ NHÂN */}
                  <section>
                    <Title level={5} style={{ color: "#1677ff" }}>
                      <UserOutlined /> Thông tin cá nhân
                    </Title>
                    <Row gutter={[16, 12]}>
                      <Col span={12}>
                        <Text type="secondary">Giới tính:</Text> <br />
                        <b>{selectedUser.gender}</b>
                      </Col>
                      <Col span={12}>
                        <Text type="secondary">Ngày sinh:</Text> <br />
                        <b>{selectedUser.birthDate}</b>
                      </Col>
                      <Col span={12}>
                        <Text type="secondary">
                          <IdcardOutlined /> Số CCCD:
                        </Text>{" "}
                        <br />
                        <b>{selectedUser.cccd}</b>
                      </Col>
                      <Col span={12}>
                        <Text type="secondary">
                          <PhoneOutlined /> Điện thoại:
                        </Text>{" "}
                        <br />
                        <b>{selectedUser.phone}</b>
                      </Col>
                      <Col span={24}>
                        <Text type="secondary">
                          <MailOutlined /> Email:
                        </Text>{" "}
                        <br />
                        <b>{selectedUser.email || "N/A"}</b>
                      </Col>
                      <Col span={24}>
                        <Text type="secondary">
                          <EnvironmentOutlined /> Địa chỉ:
                        </Text>{" "}
                        <br />
                        <b>{selectedUser.address}</b>
                      </Col>
                    </Row>
                  </section>

                  <Divider style={{ margin: "16px 0" }} />

                  {/* PHẦN 2: HỌC TẬP & NỘI TRÚ */}
                  <section>
                    <Title level={5} style={{ color: "#52c41a" }}>
                      <ReadOutlined /> Học tập & Nội trú
                    </Title>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <div
                          style={{
                            background: "#f6ffed",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #b7eb8f",
                          }}
                        >
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            Trường học / Ngành
                          </Text>
                          <div style={{ fontWeight: 600 }}>{selectedUser.school}</div>
                          <div style={{ fontSize: "13px" }}>{selectedUser.major}</div>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div
                          style={{
                            background: "#e6f7ff",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #91d5ff",
                          }}
                        >
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            Đăng ký phòng
                          </Text>
                          <div style={{ fontWeight: 600 }}>Khu {selectedUser.area}</div>
                          <div style={{ fontSize: "13px" }}>Loại phòng {selectedUser.roomType} người</div>
                        </div>
                      </Col>
                      <Col span={24}>
                        <Text type="secondary">
                          <CustomerServiceOutlined /> Dịch vụ đăng ký:
                        </Text>
                        <div style={{ marginTop: 6 }}>
                          {selectedUser.services?.length > 0 ? (
                            selectedUser.services.map((s) => (
                              <Tag key={s} color="orange" style={{ marginBottom: 4 }}>
                                {s}
                              </Tag>
                            ))
                          ) : (
                            <Text type="secondary" italic>
                              Không đăng ký dịch vụ thêm
                            </Text>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </section>

                  {/* PHẦN 3: LIÊN HỆ KHẨN CẤP */}
                  <section
                    style={{
                      background: "#fff2f0",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px dashed #ffccc7",
                    }}
                  >
                    <Title
                      level={5}
                      style={{ color: "#ff4d4f", fontSize: "15px", marginBottom: 8 }}
                    >
                      <SafetyCertificateOutlined /> LIÊN HỆ KHẨN CẤP
                    </Title>
                    <Row gutter={[16, 12]}>
                      <Col span={12}>
                        <Text type="secondary">Người thân:</Text> <br />
                        <b>{selectedUser.emergencyName}</b>
                      </Col>
                      <Col span={12}>
                        <Text type="secondary">SĐT khẩn cấp:</Text> <br />
                        <b style={{ color: "#ff4d4f" }}>{selectedUser.emergencyPhone}</b>
                      </Col>
                    </Row>
                  </section>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default ApproveRegistration;