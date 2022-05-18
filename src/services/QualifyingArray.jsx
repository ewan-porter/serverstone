import React, { useState, useEffect } from 'react';

import { useGetLastRaceQualifyingQuery } from "../services/f1Api";

import { Table } from 'antd';
import { ScreenSize } from "../services/ScreenSize";
import Loader from '../components/Loader';



const QualifyingArray = () => {

const screenSize = ScreenSize();

const { data, isFetching } = useGetLastRaceQualifyingQuery();


const qualifyingTable = data?.MRData?.RaceTable?.Races[0].QualifyingResults
const [qualifyingData, setQualifyingData ] = useState()




const qualifyingColumns = (screenSize === false ? [
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
    title: 'Q1',
    dataIndex: 'q1',
    key: 'q1'
  },
  {
    title: 'Q2',
    dataIndex: 'q2',
    key: 'q2'
  },
  {
    title: 'Q3',
    dataIndex: 'q3',
    key: 'q3'
  },
  
] : [
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
    title: "Q1, Q2, Q3",
    render: (record) => (
      <React.Fragment>
        {record.q1}
        <br />
        {record.q2}
        <br />
        {record.q3}
    
      </React.Fragment>
    ),
    responsive: ["xs"]
  },

  
 
]);




useEffect(() => {
  setQualifyingData(qualifyingTable?.map((index=> (
    {
      key: index?.position,
      position: index?.position,
      driverId: index?.Driver.givenName + ' ' + index.Driver.familyName,
      q1: index?.Q1,
      q2: index?.Q2,
      q3: index?.Q3

    }
  ))))
}, [qualifyingTable]);


if (isFetching) return <Loader/>
return (
  <Table dataSource={qualifyingData} columns={qualifyingColumns} />
);
}

export default QualifyingArray;