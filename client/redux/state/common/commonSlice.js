import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        isAddEmployeeModalOpen: false
    },
    reducers: {
        addEmployeeModalToggle: state => {
            state.isAddEmployeeModalOpen = !state.isAddEmployeeModalOpen;
        }
    }
});

export const { addEmployeeModalToggle } = commonSlice.actions;
export default commonSlice.reducer;
