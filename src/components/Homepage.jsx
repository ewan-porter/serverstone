import React, { useState } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Card } from "antd";
import { Link } from "react-router-dom";

import { useGetLastRaceQuery } from "../services/f1Api";
import { Standings, Schedule } from "../components";

import ResultsArray from '../services/ResultsArray';

import circuitImages from '../images/circuits/circuitIndex';



const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetLastRaceQuery();
  const raceTrack = data?.MRData?.RaceTable?.Races[0];






  if (isFetching) return "Loading...";

 const circuitUrl = raceTrack.Circuit.circuitId;
 
  return (
    <>
      <Title level={2} className="heading">
        Latest Race Results
      </Title>
   
      <Row>
        <Col span={24}>
          {" "}
          <Card 
          title={raceTrack.raceName} 
          style={{ width: 300 }}
          cover={<img src={circuitImages[circuitUrl]}/>}
          
          >
            
            <p><b>Circuit: </b>{raceTrack.Circuit.circuitName}</p>
            <p><b>City: </b>{raceTrack.Circuit.Location.locality}, {raceTrack.Circuit.Location.country}</p>
            <p><b>Round: </b>{raceTrack.round}</p>
            <p><b>Date: </b>{raceTrack.date}</p>
          </Card>
        </Col>
      </Row>

      
          <ResultsArray/>
     
      <div className="home-heading-container">
        <Title level={2} className="home-title">Current Standings</Title>
        <Title level={3} className="show-more"><Link to="/standings">Show More</Link></Title>
      </div>
      <Standings simplified/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Race Schedule</Title>
        <Title level={3} className="show-more"><Link to="/schedule">Show More</Link></Title>
      </div>
      <Schedule simplified/>
    </>
  );
};

export default Homepage;
