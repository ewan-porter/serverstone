import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import driverImages from "../images/drivers/driverIndex";

import { useGetStandingsQuery } from "../services/f1Api";


const Standings = ({ simplified }) => {
  const count = simplified ? 8 : 100;
 const { data, isFetching } = useGetStandingsQuery(count);
  const [searchTerm, setSearchTerm] = useState("");

  const [leaderboard, setLeaderboard] = useState();

  useEffect(() => { 
    
    setLeaderboard(
      data?.MRData?.StandingsTable?.StandingsLists[0].DriverStandings
    );

    const filteredData =
      data?.MRData?.StandingsTable?.StandingsLists[0].DriverStandings.filter(
        (Driver) =>
          Driver.Driver.familyName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
          || Driver.Driver.givenName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
          || Driver.Constructors[0].name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
          
      );

    setLeaderboard(filteredData);
  }, [data, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <>
    {!simplified &&(
<div className="search-driver">
        <Input
          placeholder="Search Drivers or Constructors"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

    )}
      

      <Row gutter={[32, 32]} className="f1-card-container">
        {leaderboard?.map((index) => (
          <Col xs={24} sm={12} lg={6} className="f1-card" key={index.position}>
            <Link to={`/standings/${index.Driver.driverId}`}>
              <Card
                title={`${index.position}. ${index.Driver.familyName}`}
                cover={
                  <img
                    className="f1-image"
                    src={driverImages[index.Driver.driverId]}
                  />
                }
                hoverable
              >
                <p>
                  <b>Points:</b> {index.points}
                </p>
                <p>
                  <b>Constructor:</b> {index.Constructors[0].name}
                </p>
                <p>
                  <b>Nationality:</b> {index.Driver.nationality}
                </p>
                <p>
                  <b>DOB:</b> {index.Driver.dateOfBirth}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Standings;
