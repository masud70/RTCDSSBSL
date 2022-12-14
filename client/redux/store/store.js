import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../state/auth/authSlice';
import commonSlice from '../state/common/commonSlice';
import socketSlice from '../state/webSocket/socketSlice';

export default configureStore({
    reducer: {
        socket: socketSlice,
        auth: authSlice,
        common: commonSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
