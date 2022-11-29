import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../state/auth/authSlice";
import socketSlice from "../state/webSocket/socketSlice";

export default configureStore({
    reducer: {
        socket: socketSlice,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
