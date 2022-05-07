import { Col, Typography, Row } from 'antd';
import React from 'react';
import { OrderedListOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;



const DriverResult = (raceResult) => {


    
    const driverId = raceResult?.driver
    const trackInfo = raceResult?.raceResult?.MRData?.RaceTable?.Races[0];
    const driverResults = raceResult?.raceResult?.MRData.RaceTable?.Races[0].Results.filter(
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
       
      ]   
      
  

  return (
    <>
    {/* Rendering Track info */}
    <Col className="stats-container">
          <Col className="driver-statistics">
            <Col className="driver-statistics-heading">
              <Title level={3} className="driver-details-heading">
                Track
              </Title>
              
            </Col>
            {trackDetails.map(({ icon, title, value }) => (
              <Col className="driver-stats">
                <Col className="driver-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>

{/* Rendering Driver race stats */}
          <Col className="other-stats-info">
            <Col className="driver-statistics-heading">
              <Title level={3} className="driver-details-heading">
                Driver Results
              </Title>
              
            </Col>
            {driverTimes.map(({ icon, title, value }) => (
              <Col className="driver-stats">
                <Col className="driver-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
    </>
  )
}

export default DriverResult