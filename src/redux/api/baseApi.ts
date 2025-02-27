import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath:'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:5002/api',
        credentials:'include'
    }),
    endpoints:() => ({
    }),
    tagTypes:['semester']
})