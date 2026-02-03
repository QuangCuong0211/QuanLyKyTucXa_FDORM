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
  id: string;
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
}

const ApproveRegistration: React.FC = () => {
  const [data, setData] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Registration | null>(null);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/registrations");
      setData(res.data);
    } catch (error) {
      message.error("Lỗi tải dữ liệu!");
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

  // 1. Xử lý TỪ CHỐI: Xóa đơn ngay lập tức
  const handleReject = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/registrations/${id}`);
      message.success("Đã từ chối và xóa đơn đăng ký!");
      setData(data.filter((item) => item.id !== id));
      setIsModalOpen(false);
    } catch (error) {
      message.error("Lỗi khi xóa đơn!");
    }
  };

  // 2. Xử lý ĐỒNG Ý: Chuyển thẳng sang residents (lấy khu mặc định từ form)
  const handleApprove = async (record: Registration) => {
    try {
      const residentData = {
        ...record,
        status: "approved",
        approvedAt: new Date().toISOString(),
      };
      // Gửi sang bảng residents để hiển thị bên trang Đợt đăng ký KTX
      await axios.post("http://localhost:3000/residents", residentData);
      // Xóa khỏi danh sách chờ
      await axios.delete(`http://localhost:3000/registrations/${record.id}`);

      message.success(`Đã phê duyệt sinh viên ${record.fullName} vào Khu ${record.area}`);
      setData(data.filter((item) => item.id !== record.id));
      setIsModalOpen(false);
    } catch (error) {
      message.error("Lỗi khi phê duyệt đơn!");
    }
  };

  const columns: ColumnsType<Registration> = [
    {
      title: "Ảnh",
      dataIndex: "avatar",
      width: 100,
      render: (img) => (
        <Image
          src={img}
          width={60}
          height={75}
          style={{ objectFit: "cover", borderRadius: 6, border: "1px solid #f0f0f0" }}
        />
      ),
    },
    {
      title: "Thông tin sinh viên",
      render: (_, r) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ fontSize: "15px" }}>{r.fullName}</Text>
          <Tag color="blue">MSSV: {r.studentId}</Tag>
        </Space>
      ),
    },
    {
      title: "Nguyện vọng nội trú",
      render: (_, r) => (
        <Space direction="vertical" size={2}>
          <Tag icon={<HomeOutlined />} color="cyan">Khu {r.area}</Tag>
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

          <Popconfirm title="Từ chối & Xóa đơn này?" onConfirm={() => handleReject(record.id)}>
            <Button danger icon={<CloseCircleOutlined />}>
              Từ chối
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card bordered={false} className="shadow-sm">
      <Title level={3} style={{ marginBottom: 24, color: "#1677ff" }}>
        Danh sách đơn đăng ký chờ duyệt
      </Title>
      
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 7 }}
      />

      {/* MODAL CHI TIẾT DESIGN MỚI */}
      <Modal
        title={<span style={{ fontSize: 18, color: '#1677ff' }}>HỒ SƠ ĐĂNG KÝ NỘI TRÚ</span>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
        centered
        footer={[
          <Button key="close" size="large" onClick={() => setIsModalOpen(false)}>
            Đóng
          </Button>,
          <Popconfirm key="rej" title="Xóa đơn này?" onConfirm={() => selectedUser && handleReject(selectedUser.id)}>
            <Button size="large" danger icon={<CloseCircleOutlined />}>Từ chối</Button>
          </Popconfirm>,
          <Button 
            key="app" 
            size="large"
            type="primary" 
            style={{ backgroundColor: "#52c41a", height: 'auto', padding: '8px 24px' }} 
            icon={<CheckCircleOutlined />}
            onClick={() => selectedUser && handleApprove(selectedUser)}
          >
            Đồng ý phê duyệt
          </Button>
        ]}
      >
        {selectedUser && (
          <div style={{ padding: '12px 0' }}>
            <Row gutter={[32, 32]}>
              {/* CỘT TRÁI: AVATAR */}
              <Col xs={24} md={8}>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '24px', 
                  background: '#f8f9fa', 
                  borderRadius: '16px',
                  border: '1px solid #f0f0f0'
                }}>
                  <Image
                    src={selectedUser.avatar}
                    style={{ 
                      width: '100%', 
                      maxWidth: '220px',
                      aspectRatio: '3/4',
                      objectFit: 'cover', 
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    }}
                  />
                  <Title level={4} style={{ marginTop: '20px', marginBottom: '8px', color: '#1a1a1a' }}>
                    {selectedUser.fullName.toUpperCase()}
                  </Title>
                  <Tag color="geekblue" style={{ fontSize: '14px', padding: '4px 12px', borderRadius: '20px' }}>
                    {selectedUser.studentId}
                  </Tag>
                </div>
              </Col>

              {/* CỘT PHẢI: THÔNG TIN CHI TIẾT */}
              <Col xs={24} md={16}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* PHẦN 1: THÔNG TIN CÁ NHÂN */}
                  <section>
                    <Title level={5} style={{ color: '#1677ff' }}><UserOutlined /> Thông tin cá nhân</Title>
                    <Row gutter={[16, 12]}>
                      <Col span={12}><Text type="secondary">Giới tính:</Text> <br/> <b>{selectedUser.gender}</b></Col>
                      <Col span={12}><Text type="secondary">Ngày sinh:</Text> <br/> <b>{selectedUser.birthDate}</b></Col>
                      <Col span={12}><Text type="secondary"><IdcardOutlined /> Số CCCD:</Text> <br/> <b>{selectedUser.cccd}</b></Col>
                      <Col span={12}><Text type="secondary"><PhoneOutlined /> Điện thoại:</Text> <br/> <b>{selectedUser.phone}</b></Col>
                      <Col span={24}><Text type="secondary"><MailOutlined /> Email:</Text> <br/> <b>{selectedUser.email || "N/A"}</b></Col>
                      <Col span={24}><Text type="secondary"><EnvironmentOutlined /> Địa chỉ:</Text> <br/> <b>{selectedUser.address}</b></Col>
                    </Row>
                  </section>

                  <Divider style={{ margin: 0 }} />

                  {/* PHẦN 2: HỌC TẬP & NỘI TRÚ */}
                  <section>
                    <Title level={5} style={{ color: '#52c41a' }}><ReadOutlined /> Học tập & Nội trú</Title>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <div style={{ background: '#f6ffed', padding: '12px', borderRadius: '8px', border: '1px solid #b7eb8f' }}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>Trường học / Ngành</Text>
                          <div style={{ fontWeight: 600 }}>{selectedUser.school}</div>
                          <div style={{ fontSize: '13px' }}>{selectedUser.major}</div>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{ background: '#e6f7ff', padding: '12px', borderRadius: '8px', border: '1px solid #91d5ff' }}>
                          <Text type="secondary" style={{ fontSize: '12px' }}>Đăng ký phòng</Text>
                          <div style={{ fontWeight: 600 }}>Khu {selectedUser.area}</div>
                          <div style={{ fontSize: '13px' }}>Loại phòng {selectedUser.roomType} người</div>
                        </div>
                      </Col>
                      <Col span={24}>
                        <Text type="secondary"><CustomerServiceOutlined /> Dịch vụ đăng ký:</Text>
                        <div style={{ marginTop: 6 }}>
                          {selectedUser.services.length > 0 
                            ? selectedUser.services.map(s => <Tag key={s} color="orange" style={{ marginBottom: 4 }}>{s}</Tag>) 
                            : <Text type="secondary" italic>Không đăng ký dịch vụ thêm</Text>
                          }
                        </div>
                      </Col>
                    </Row>
                  </section>

                  {/* PHẦN 3: LIÊN HỆ KHẨN CẤP */}
                  <section style={{ background: '#fff2f0', padding: '16px', borderRadius: '12px', border: '1px dashed #ffccc7' }}>
                    <Title level={5} style={{ color: '#ff4d4f', fontSize: '15px', marginBottom: 8 }}>
                      <SafetyCertificateOutlined /> LIÊN HỆ KHẨN CẤP
                    </Title>
                    <Row>
                      <Col span={12}><Text type="secondary">Người thân:</Text> <br/> <b>{selectedUser.emergencyName}</b></Col>
                      <Col span={12}><Text type="secondary">SĐT khẩn cấp:</Text> <br/> <b style={{ color: '#ff4d4f' }}>{selectedUser.emergencyPhone}</b></Col>
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