import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        isAddEmployeeModalOpen: false,
        isEditEmployeeModalOpen: false,
        editModalData: {}
    },
    reducers: {
        addEmployeeModalToggle: state => {
            state.isAddEmployeeModalOpen = !state.isAddEmployeeModalOpen;
        },
        editEmployeeModalToggle: (state, action) => {
            state.isEditEmployeeModalOpen = !state.isEditEmployeeModalOpen;
            if (action.payload) {
                state.editModalData = action.payload.data;
            }
        }
    }
});

export const { addEmployeeModalToggle, editEmployeeModalToggle } =
    commonSlice.actions;
export default commonSlice.reducer;
