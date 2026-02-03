import React, { useEffect, useState } from "react";
import { Card, Col, Row, List, Avatar, Tag, Typography, message, Spin ,Space} from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

interface Resident {
  id: string;
  fullName: string;
  studentId: string;
  area: string;
  roomType: string;
  status: string;
}

const RegistrationPeriod: React.FC = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResidents = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/residents");
      setResidents(res.data);
    } catch (error) {
      message.error("Lỗi tải danh sách sinh viên đã duyệt!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  // Hàm render danh sách sinh viên theo Khu
  const renderAreaColumn = (areaName: string, color: string) => {
    const filteredData = residents.filter((r) => r.area === areaName);

    return (
      <Col xs={24} lg={8}>
        <Card 
          title={<Title level={4} style={{ margin: 0, color: color }}>Khu {areaName}</Title>}
          extra={<Tag color={color}>{filteredData.length} Sinh viên</Tag>}
          className="shadow-sm"
          style={{ height: '100%', borderRadius: '12px' }}
        >
          <List
            dataSource={filteredData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} style={{ backgroundColor: color }} />}
                  title={<b>{item.fullName}</b>}
                  description={
                    <Space direction="vertical" size={0}>
                      <Text type="secondary">MSSV: {item.studentId}</Text>
                      <Text ><HomeOutlined /> Phòng {item.roomType} người</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
            locale={{ emptyText: "Chưa có sinh viên được duyệt" }}
          />
        </Card>
      </Col>
    );
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;

  return (
    <div style={{ padding: '10px' }}>
      <Title level={2} style={{ marginBottom: 24 }}>Quản lý Đợt Đăng ký KTX</Title>
      <Row gutter={[24, 24]}>
        {renderAreaColumn("A", "#1677ff")}
        {renderAreaColumn("B", "#52c41a")}
        {renderAreaColumn("C", "#f5222d")}
      </Row>
    </div>
  );
};

export default RegistrationPeriod;