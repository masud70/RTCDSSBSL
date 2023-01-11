import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import swal from 'sweetalert';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: hasCookie(process.env.ACCESS_TOKEN),
        token: getCookie(process.env.ACCESS_TOKEN),
        userData: {}
    },
    reducers: {
        login: (state, action) => {
            state.status = true;
            if (action.payload.userData) {
                state.userData = action.payload.userData;
            }
            if (action.payload.token) {
                state.token = action.payload.token;
                setCookie(process.env.ACCESS_TOKEN, action.payload.token);
                swal('Login successful', { icon: 'success' });
            }
        },

        logout: state => {
            deleteCookie(process.env.ACCESS_TOKEN);
            state.status = false;
            swal('Logout successful', { icon: 'success' });
        },

        setAuthUserData: (state, action) => {
            if (action.payload.userData) {
                state.userData = action.payload.userData;
            }
        }
    }
});

export const { login, logout, setAuthUserData } = authSlice.actions;
export default authSlice.reducer;
