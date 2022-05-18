



import React, { useState, useEffect } from 'react';

import { useGetScheduleQuery } from "../services/f1Api";

import { Table } from 'antd';
import { ScreenSize } from "../services/ScreenSize";
import Loader from './Loader';


const Schedule = () => {

const screenSize = ScreenSize();

const { data, isFetching } = useGetScheduleQuery();

const scheduleTable = data?.MRData?.RaceTable?.Races
const [scheduleData, setScheduleData] = useState();

const date = new Date().toISOString().slice(0, 10);



const scheduleColumns = (screenSize === false ? [
  {
    title: 'Round',
    dataIndex: 'round',
    key: 'round',
  },
  {
    title: 'Race',
    dataIndex: 'raceName',
    key: 'raceName'
  },
  {
    title: 'Circuit',
    dataIndex: 'circuitName',
    key: 'circuitName'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },

  
] : [
  {
    title: 'Round',
    dataIndex: 'round',
    key: 'round',
  },
  {
    title: "Race, Circuit",
    render: (record) => (
      <React.Fragment>
        {record.raceName}
        <br />
        {record.circuitName}
    
      </React.Fragment>
    ),
    responsive: ["xs"]
  },

  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
]);

  useEffect(() => {
    setScheduleData(scheduleTable?.map((index=> (
      {
        key: index?.round,
        round: index?.round,
        raceName: index?.raceName,
        circuitName: index?.Circuit.circuitName,
        date: index?.date
     
  
      }
    ))))
  }, [scheduleTable]);
  

  if (isFetching) return <Loader/>

  return (
    <Table 
    dataSource={scheduleData} 
    columns={scheduleColumns} 
    rowClassName={(scheduleData) => scheduleData.date < date ? "past-race" : null}
    />
  )
}

export default Schedule