import React, { useState, useEffect } from 'react';

import { useGetLastRaceQuery } from "../services/f1Api";

import { Table } from 'antd';



const ResultsArray = () => {

const { data, isFetching } = useGetLastRaceQuery();


const racetable = data?.MRData?.RaceTable?.Races[0].Results
const [dataSource, setDataSource ] = useState([])



const columns = [
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
    title: 'No',
    dataIndex: 'permanentNumber',
    key: 'permanentNumber'
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
];



useEffect(() => {
  setDataSource(racetable?.map((index=> (
    {
      key: index.position,
      position: index.position,
      driverId: index.Driver.givenName + ' ' + index.Driver.familyName,
      permanentNumber: index.Driver.permanentNumber,
      constructor: index.Constructor.name,
      time: index?.Time?.time ?? index.status,
      points: index.points

    }
  ))))
}, []);


return (
  <Table dataSource={dataSource} columns={columns} />
);
}

export default ResultsArray;