import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from './slices/bookingSlice';
import RoomCard from "@/Components/Rooms/RoomCard";

export const store = configureStore({
    reducer: {
        booking: bookingReducer,
        //For RTK QUERY
        //[roomApi.reducerPath]: roomsApi.reducer,
    },
    //middleware: () => getDefaultMiddleware().concat(roomsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;