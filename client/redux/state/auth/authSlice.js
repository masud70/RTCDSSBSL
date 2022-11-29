import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        token: null,
        userData: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
        },

        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
        },

        setUserData: (state, action) => {
            state.userData = action.payload.userData;
        },
    },
});

export const { login, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;
