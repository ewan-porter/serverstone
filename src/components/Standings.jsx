import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, AutoComplete } from "antd";
import { ScreenSize } from "../services/ScreenSize";

import driverImages from "../images/drivers/driverIndex";

import { useGetStandingsQuery } from "../services/f1Api";

const Standings = ({ simplified }) => {
  const screenSize = ScreenSize();

  const displayedDrivers = (screenSize == false ? 12 : 6)
  const count = simplified ? displayedDrivers : 100;
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
          Driver.Driver.familyName
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase()) ||
          Driver.Driver.givenName
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase()) ||
          Driver.Constructors[0].name
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase())
      );

    setLeaderboard(filteredData);
  }, [data, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className="search-driver">
          <Input
            placeholder="Search Drivers or Constructors"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row  justify="center" gutter={[2, 32]} className="f1-card-container">
        {leaderboard?.map((index) => (
          <Col xs={24} sm={12} md={8} lg={8} xl={6} xxl={4} key={index.position}>
            <Link to={`/standings/${index.Driver.driverId}`}>
              <Card className="f1-card"
              size="small"
              style={{width:225
        
              }}
                title={`${index.position}. ${index.Driver.familyName}`}
                cover={
                  <img orientation="center"
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
                  <b>Wins:</b> {index.wins}
                </p>
                <p>
                  <b>Driver Number:</b> {index.Driver.permanentNumber}
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
