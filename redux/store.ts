import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from './slices/bookingSlice';
import { employeeApi } from "./api/employeeApi";

export const store = configureStore({
    reducer: {
        booking: bookingReducer,
        [employeeApi.reducerPath]: employeeApi.reducer
        //For RTK QUERY
        //[roomApi.reducerPath]: roomsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employeeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;