import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
    name: "socket",
    initialState: {
        isSet: true,
        ws: null,
    },
    reducers: {
        setWebSocket: (state, action) => {
            console.log("okk->", action.payload.socket);
            state.isSet = true;
            state.ws = action.payload.socket;
        },

        removeWebSocket: (state) => {
            state.isSet = false;
            state.ws = null;
        },
    },
});

export const { setWebSocket, removeWebSocket } = socketSlice.actions;
export default socketSlice.reducer;
