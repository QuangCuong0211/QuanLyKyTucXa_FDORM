import React, { useEffect, useState } from "react";
import { Card, Col, Row, List, Avatar, Tag, Typography, message, Spin, Space } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

interface Resident {
  _id: string;
  fullName: string;
  studentId: string;
  area: string;
  roomType: string;
  avatar?: string;
  status?: string;      // "approved" nếu đã duyệt
  approvedAt?: string;  // để lọc nếu chưa có status
}

const RegistrationPeriod: React.FC = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchApprovedResidents = async () => {
  setLoading(true);
  try {
    const res = await axios.get("http://localhost:3000/api/registerktx");
    
    const allData = Array.isArray(res.data) ? res.data : res.data?.data || [];
    
    // Chỉ lấy những đơn đã approved
    const approved = allData.filter((r: Resident) => 
      r.status === "approved"
    );
    
    setResidents(approved);
  } catch (error) {
    console.error("Lỗi tải danh sách đã duyệt:", error);
    message.error("Không thể tải danh sách sinh viên đã vào KTX!");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchApprovedResidents();
  }, []);

  // Hàm render danh sách theo khu
  const renderAreaColumn = (areaName: string, color: string) => {
    const filteredData = residents.filter((r) => r.area === areaName);

    return (
      <Col xs={24} lg={8} key={areaName}>
        <Card
          title={<Title level={4} style={{ margin: 0, color }}>{`Khu ${areaName}`}</Title>}
          extra={<Tag color={color}>{filteredData.length} Sinh viên</Tag>}
          style={{ height: "100%", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          <List
            dataSource={filteredData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={item.avatar ? `http://localhost:3000/${item.avatar.replace(/^\//, '')}` : undefined}
                      icon={<UserOutlined />}
                      style={{ backgroundColor: color }}
                    />
                  }
                  title={<b>{item.fullName}</b>}
                  description={
                    <Space direction="vertical" size={0}>
                      <Text type="secondary">MSSV: {item.studentId}</Text>
                      <Text>
                        <HomeOutlined /> Phòng {item.roomType} người
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
            locale={{ emptyText: "Chưa có sinh viên được duyệt ở khu này" }}
          />
        </Card>
      </Col>
    );
  };

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>;

  return (
    <div style={{ padding: "16px" }}>
      <Title level={2} style={{ marginBottom: 24, color: "#1677ff" }}>
        Quản lý Đợt Đăng ký KTX
      </Title>
      <Row gutter={[24, 24]}>
        {renderAreaColumn("A", "#1677ff")}
        {renderAreaColumn("B", "#52c41a")}
        {renderAreaColumn("C", "#f5222d")}
      </Row>
    </div>
  );
};

export default RegistrationPeriod;