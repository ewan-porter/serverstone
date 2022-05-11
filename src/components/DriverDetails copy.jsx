import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import driverImages from "../images/drivers/driverIndex";
import { Col, Row, Typography, Select, Image } from "antd";
import { StopOutlined, TrophyOutlined, OrderedListOutlined, CarOutlined, BarChartOutlined, UserOutlined, ScheduleOutlined, HomeOutlined, NumberOutlined } from "@ant-design/icons";

import { useGetDriverdetailsQuery, useGetDriverresultsQuery, useGetScheduleQuery } from "../services/f1Api";
import DriverResult from "./DriverResult";

const { Title, Text } = Typography;
const { Option } = Select;

const DriverDetails = () => {
  const { driverId } = useParams();
 const { data, isFetching } = useGetDriverdetailsQuery();
 const currentRound = parseInt(data?.MRData?.StandingsTable?.StandingsLists[0]?.round);

 

  const [roundNumber, setRoundNumber] = useState(1);

  

 
  const {data: trackName } = useGetScheduleQuery();
  const { data: raceResult } = useGetDriverresultsQuery(roundNumber);

 

  const round = [];


    for(let i = 0; i < currentRound; i++) {
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
      <Col className="driver-detail-container">
        <Col className="driver-heading-container">
          <Title level={2} className="driver-name">
            {driverInfo?.[0].Driver.givenName}{" "}
            {driverInfo?.[0].Driver.familyName}
          </Title>
          <Image
                    className="f1-image"
                    src={driverImages[driverInfo?.[0].Driver.driverId]}
                  />
          <p>Driver details and race results</p>
        </Col>
        
        <Col className="stats-container">
          <Col className="driver-statistics">
            <Col className="driver-statistics-heading">
              <Title level={3} className="driver-details-heading">
                {driverInfo?.[0].Driver.givenName}{" "}
                {driverInfo?.[0].Driver.familyName} Statistics
              </Title>
              <p>
                An overview of {driverInfo?.[0].Driver.familyName}'s season.
              </p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="driver-stats">
                <Col className="driver-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="driver-statistics-heading">
              <Title level={3} className="driver-details-heading">
                Other info
              </Title>
              <p>
                {driverInfo?.[0].Driver.familyName}'s personal info
              </p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="driver-stats">
                <Col className="driver-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col><Select
        
       
          className="select-round"
          placeholder="Select Race"
          onChange={(key) => setRoundNumber(key)}
        >
          {round.map((key) => (
            <Option key={((key) + 1)}>{trackName?.MRData?.RaceTable?.Races[key]?.raceName}</Option>
          ))}
        </Select>
        <DriverResult raceResult={raceResult} driver={driverInfo?.[0].Driver.driverId}/>
      </Col>
    </>
  );
};

export default DriverDetails;
