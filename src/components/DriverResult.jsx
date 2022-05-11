import { Col, Typography, Row, Space, Card } from "antd";
import React from "react";
import { OrderedListOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const DriverResult = (raceResult) => {
  const driverId = raceResult?.driver;
  const trackInfo = raceResult?.raceResult?.MRData?.RaceTable?.Races[0];
  const driverResults =
    raceResult?.raceResult?.MRData.RaceTable?.Races[0].Results.filter(
      (Driver) => Driver.Driver.driverId.includes(driverId)
    );

  //
  const trackDetails = [
    {
      title: "Date",
      value: `${trackInfo?.date}`,
      icon: <OrderedListOutlined />,
    },
    {
      title: "Round",
      value: `${trackInfo?.round}`,
      icon: <OrderedListOutlined />,
    },
    {
      title: "Location",
      value: `${trackInfo?.Circuit.Location.locality}, ${trackInfo?.Circuit.Location.country}`,
      icon: <OrderedListOutlined />,
    },
    {
      title: "Circuit",
      value: `${trackInfo?.Circuit.circuitName}`,
      icon: <OrderedListOutlined />,
    },
  ];

  const driverTimes = [
    {
      title: "Position",
      value: `${driverResults?.[0]?.position}`,
      icon: <OrderedListOutlined />,
    },
    {
      title: "Points",
      value: `${driverResults?.[0]?.points}`,
      icon: <OrderedListOutlined />,
    },
    {
      title: "Starting Grid Position",
      value: `${driverResults?.[0]?.grid}`,
      icon: <OrderedListOutlined />,
    },

    {
      title: "Fastest Lap Rank",
      value: `${driverResults?.[0]?.FastestLap.rank}`,
      icon: <OrderedListOutlined />,
    },
    {
      title: "Fastest Lap Time",
      value: `${driverResults?.[0]?.FastestLap.Time.time}`,
      icon: <OrderedListOutlined />,
    },
  ];

  return (
    <>
    <Row gutter={[32, 32]}>
      <Col span={24} xs={24} sm={24} md={12} xl={12} xxl={{span: 8, offset: 5}}
     >
        <Card 
        title={`${trackInfo?.Circuit.circuitName} Result`}>
          {driverTimes.map(({ icon, title, value }) => (
            <Row justify="space-between">
              <Col>
                <Space size={"large"}>
                  <Title level={5}>{icon}</Title>
                  <Title level={5}>{title}</Title>
                </Space>
              </Col>
              <Col>
                <Title level={5} className="stats">
                  {value}
                </Title>
              </Col>
            </Row>
          ))}
        </Card>
      </Col>

      <Col span={24} xs={24} sm={24} md={12} xl={12} xxl={8}>
        <Card title={`Season Results`}>
          {trackDetails.map(({ icon, title, value }) => (
            <Row justify="space-between">
              <Col>
                <Space size={"large"}>
                  <Title level={5}>{icon}</Title>
                  <Title level={5}>{title}</Title>
                </Space>
              </Col>
              <Col>
                <Title level={5} className="stats">
                  {value}
                </Title>
              </Col>
            </Row>
          ))}
        </Card>
      </Col>
      </Row>
     
    </>
  );
};

export default DriverResult;
