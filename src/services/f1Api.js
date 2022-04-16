import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://ergast.com/api/f1';

const createRequest = (url) =>({url})

export const f1Api = createApi({
    reducer: 'f1Api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getLastRace: builder.query({
            query: () => createRequest('/current/last/results.json')
        }),

        getStandings: builder.query({
            query: (count) => createRequest(`/current/driverStandings.json?limit=${count}`)
        }),

    }),
    
})

export const {
    useGetLastRaceQuery,
    useGetStandingsQuery
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
