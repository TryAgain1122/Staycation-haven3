import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api"}),
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query(params) {
                return {
                    url: "/employees",
                    params
                };
            },
        }),

        //Create employee
        createEmployee: builder.mutation({
            query(body) {
                return {
                    url: "/employee",
                    method: "POST",
                    body
                }
            }
        })
    })
});

export const {
    useCreateEmployeeMutation,
} = employeeApi