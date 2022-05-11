import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import driverImages from "../images/drivers/driverIndex";
import { Col, Row, Typography, Select, Image, Card, Space } from "antd";
import {
  StopOutlined,
  TrophyOutlined,
  OrderedListOutlined,
  CarOutlined,
  BarChartOutlined,
  UserOutlined,
  ScheduleOutlined,
  HomeOutlined,
  NumberOutlined,
} from "@ant-design/icons";

import {
  useGetDriverdetailsQuery,
  useGetDriverresultsQuery,
  useGetScheduleQuery,
} from "../services/f1Api";
import DriverResult from "./DriverResult";

const { Title, Text } = Typography;
const { Option } = Select;

const DriverDetails = () => {
  const { driverId } = useParams();
  const { data, isFetching } = useGetDriverdetailsQuery();
  const currentRound = parseInt(
    data?.MRData?.StandingsTable?.StandingsLists[0]?.round
  );

  const [roundNumber, setRoundNumber] = useState(1);

  const { data: trackName } = useGetScheduleQuery();
  const { data: raceResult } = useGetDriverresultsQuery(roundNumber);

  const round = [];

  for (let i = 0; i < currentRound; i++) {
    round.push(i);
  }

  const driverInfo =
    data?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings.filter(
      (Driver) => Driver.Driver.driverId.includes(driverId)
    );

  const stats = [
    {
      title: "Position",
      value: `${driverInfo?.[0].position}`,
      icon: <OrderedListOutlined />,
    },
    {
      title: "Points",
      value: `${driverInfo?.[0].points}`,
      icon: <BarChartOutlined />,
    },
    {
      title: "Wins",
      value: `${driverInfo?.[0].wins}`,
      icon: <TrophyOutlined />,
    },
    {
      title: "Constructor",
      value: `${driverInfo?.[0].Constructors?.[0].name}`,
      icon: <CarOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Driver Name",
      value:
        `${driverInfo?.[0].Driver.givenName}` +
        " " +
        `${driverInfo?.[0].Driver.familyName}`,
      icon: <UserOutlined />,
    },
    {
      title: "Driver Number",
      value: `${driverInfo?.[0].Driver.permanentNumber}`,
      icon: <NumberOutlined />,
    },
    {
      title: "Date of Birth",
      value: `${driverInfo?.[0].Driver.dateOfBirth}`,
      icon: <ScheduleOutlined />,
    },
    {
      title: "Nationality",
      value: `${driverInfo?.[0].Driver.nationality}`,
      icon: <HomeOutlined />,
    },
  ];

  return (
    <>
      <Row gutter={[32, 32]} style={{paddingBottom: "20px"}}>
        <Col span={24} xl={24} xxl={5}>
          <Card
          style={{width:250
        
          }}
          className="f1-card"
            title={`${driverInfo?.[0].Driver.givenName} ${driverInfo?.[0].Driver.familyName}`}
            cover={<img src={driverImages[driverInfo?.[0].Driver.driverId]} />}
          >
            <p>Driver info and season results</p>
          </Card>
        </Col>

        <Col span={24}  xs={24} sm={24} md={12} xl={12} xxl={8}>
          <Card title={`Personal Info`}>
            {genericStats.map(({ icon, title, value }) => (
              <Row  justify="space-between">
                <Col>
                  <Space size={"large"}>
                    <Title level={5} >{icon}</Title>
                    <Title level={5} >{title}</Title>
                  </Space> 
                  </Col>
                  <Col>
                  <Title level={5} className="stats">{value}</Title>
                  </Col>
                  
               
              </Row>
            ))}
          </Card>
        </Col>


       <Col span={24} xs={24} sm={24} md={12} xl={12} xxl={8} style={{paddingBottom: "30px"}}>
          <Card title={`Season Results`}>
            {stats.map(({ icon, title, value }) => (
              <Row  justify="space-between">
                <Col>
                  <Space size={"large"}>
                    <Title level={5} >{icon}</Title>
                    <Title level={5} >{title}</Title>
                  </Space> 
                  </Col>
                  <Col>
                  <Title level={5} className="stats">{value}</Title>
                  </Col>
                  
               
              </Row>
            ))}
          </Card>
        </Col>
      </Row>

<Row gutter={[32, 32]} style={{paddingBottom: "20px"}}>
     <Col  span={24} xs={24} sm={24} md={12} xl={12} xxl={{span: 8, offset: 5}}>
      <Title level={4}>
        Individual Race Results
      </Title>
      <Select
        className="select-round"
        placeholder="Select Race"
        onChange={(key) => setRoundNumber(key)} 
        
      >
        {round.map((key) => (
          <Option key={key + 1}>
            {trackName?.MRData?.RaceTable?.Races[key]?.raceName}
          </Option>
        ))}
      </Select>
      </Col></Row>
      <DriverResult
      
        raceResult={raceResult}
        driver={driverInfo?.[0].Driver.driverId}
      />
   
    </>
  );
};

export default DriverDetails;
