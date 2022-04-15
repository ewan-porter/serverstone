import React, { useState } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Card } from "antd";
import { Link } from "react-router-dom";

import { useGetLastRaceQuery } from "../services/f1Api";
import { Standings, Schedule } from "../components";



const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetLastRaceQuery();
  const raceTrack = data?.MRData?.RaceTable?.Races[0];
  const driverPos = data?.MRData?.RaceTable?.Races[0].Results;

 
 



  if (isFetching) return "Loading...";
  return (
    <>
      <Title level={2} className="heading">
        Latest Race Results
      </Title>
     
      <Row>
        <Col span={24}>
          {" "}
          <Card title={raceTrack.raceName} style={{ width: 300 }}>
            <p><b>Circuit: </b>{raceTrack.Circuit.circuitName}</p>
            <p><b>City: </b>{raceTrack.Circuit.Location.locality}</p>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          {" "}
          <Statistic
            title="Winner"
            value={driverPos[0].Driver.familyName}
          />
        </Col>
        <Col span={8}>
          {" "}
          <Statistic
            title="P2"
            value={driverPos[1].Driver.familyName}
          />
        </Col>
        <Col span={8}>
          {" "}
          <Statistic
            title="P3"
            value={driverPos[2].Driver.familyName}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Current Standings</Title>
        <Title level={3} className="show-more"><Link to="/standings">Show More</Link></Title>
      </div>
      <Standings/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Race Schedule</Title>
        <Title level={3} className="show-more"><Link to="/schedule">Show More</Link></Title>
      </div>
      <Schedule/>
    </>
  );
};

export default Homepage;
