import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const f1NewsHeaders =  {
  'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': '52fd438e4amshc841b3f63d7103ap1dd6fejsn05d4fa2551a6'
  };

  // const params = {q: 'Formula 1', country: 'GB', lang: 'en', limit: '50', when: '30d'}

  const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

  const createRequest = (url) =>({url, headers: f1NewsHeaders})

  export const f1NewsApi = createApi({
    reducerPath: 'f1NewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
      getF1News: builder.query({
          query: ({q, count}) => createRequest(`/news/search?q=${q}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
      }),

   
  }),
  });


  export const {
    useGetF1NewsQuery
} = f1NewsApi;