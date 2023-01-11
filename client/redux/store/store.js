import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../state/authSlice';
import commonSlice from '../state/common/commonSlice';

export default configureStore({
    reducer: {
        auth: authSlice,
        common: commonSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});
