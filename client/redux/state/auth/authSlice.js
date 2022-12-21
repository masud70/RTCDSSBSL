import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: null,
        userData: null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userData = action.payload.userData;
        },

        logout: state => {
            state.isLoggedIn = false;
            state.token = null;
            state.userData = null;
            swal('Logout successful!', { icon: 'success' });
        },

        setUserData: (state, action) => {
            state.userData = action.payload.userData;
        }
    }
});

export const { login, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;
