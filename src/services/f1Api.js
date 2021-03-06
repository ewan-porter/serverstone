import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://ergast.com/api/f1';

const createRequest = (url) =>({url})

export const f1Api = createApi({
    reducerPath: 'f1Api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getLastRace: builder.query({
            query: () => createRequest('/current/last/results.json')
        }),
        getLastRaceQualifying: builder.query({
            query: () => createRequest('/current/last/qualifying.json')
        }),

        getStandings: builder.query({
            query: (count) => createRequest(`/current/driverStandings.json?limit=${count}`)
        }),

        getSchedule: builder.query({
            query: () => createRequest(`/current.json`)
        }),

        getDriverdetails: builder.query({
            query: () => createRequest(`/current/driverStandings.json`)
        }),

        getDriverresults: builder.query({
            query: (roundNumber) => createRequest(`/current/${roundNumber}/results.json`)
        }),

      

    }),
    
})

export const {
    useGetLastRaceQuery,
    useGetLastRaceQualifyingQuery,
    useGetStandingsQuery,
    useGetScheduleQuery,
    useGetDriverdetailsQuery,
    useGetDriverresultsQuery
} = f1Api;









// var axios = require('axios');

// var config = {
//   method: 'get',
//   url: 'http://ergast.com/api/f1/current/last/results',
//   headers: { }
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });
