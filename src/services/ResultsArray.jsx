import React, { useState, useEffect } from 'react';

import { useGetLastRaceQuery } from "../services/f1Api";

import { Table } from 'antd';
import { ScreenSize } from "../services/ScreenSize";
import Loader from '../components/Loader';


const ResultsArray = () => {

const screenSize = ScreenSize();

const { data, isFetching } = useGetLastRaceQuery();


const racetable = data?.MRData?.RaceTable?.Races[0].Results
const [dataSource, setDataSource ] = useState([])


const columns = (screenSize === false ? [
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'Driver',
    dataIndex: 'driverId',
    key: 'driverId'
  },
  {
    title: 'Constructor',
    dataIndex: 'constructor',
    key: 'constructor'
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: 'Points',
    dataIndex: 'points',
    key: 'points'
  },
] : [
  {
    title: "Position, Driver",
    render: (record) => (
      <React.Fragment>
        {record.position}
        <br />
        {record.driverId}
    
      </React.Fragment>
    ),
    responsive: ["xs"]
  },
 
 
  {
    title: 'Constructor',
    dataIndex: 'constructor',
    key: 'constructor'
  },

  {
    title: "Time, Points",
    render: (record) => (
      <React.Fragment>
        {record.time}
        <br />
        {record.points}
    
      </React.Fragment>
    ),
    responsive: ["xs"]
  },
  
 
 
]);




useEffect(() => {
  setDataSource(racetable?.map((index=> (
    {
      key: index.position,
      position: index.position,
      driverId: index.Driver.givenName + ' ' + index.Driver.familyName,
    
      constructor: index.Constructor.name,
      time: index?.Time?.time ?? index.status,
      points: index.points

    }
  ))))
}, []);

if (isFetching) return <Loader/>
return (
  <Table dataSource={dataSource} columns={columns} />
);
}

export default ResultsArray;