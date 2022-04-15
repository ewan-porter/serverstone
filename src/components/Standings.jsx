import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';


import { useGetLastRaceQuery, useGetStandingsQuery } from "../services/f1Api";

const Standings = () => {
  const { data: driverStandings, isFetching } = useGetStandingsQuery();
  const [ leaderboard, setLeaderboard ] = useState(driverStandings?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings);

console.log(leaderboard);

  return (
    <div>Standings</div>
  )
}

export default Standings