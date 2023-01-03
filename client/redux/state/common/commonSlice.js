import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        isAddEmployeeModalOpen: false,
        isEditEmployeeModalOpen: false,
        isUpdateCourseInfoModalOpen: false,
        editModalData: {},
        updateCourseInfoData: {},
    },
    reducers: {
        addEmployeeModalToggle: state => {
            state.isAddEmployeeModalOpen = !state.isAddEmployeeModalOpen;
        },
        updateCourseInfoModalToggle: (state, action) => {
            state.isUpdateCourseInfoModalOpen = !state.isUpdateCourseInfoModalOpen;
            if (action.payload) {
                state.updateCourseInfoData = action.payload.data;
            }
        },
        editEmployeeModalToggle: (state, action) => {
            state.isEditEmployeeModalOpen = !state.isEditEmployeeModalOpen;
            if (action.payload) {
                state.editModalData = action.payload.data;
            }
        }
    }
});

export const {
    addEmployeeModalToggle,
    editEmployeeModalToggle,
    updateCourseInfoModalToggle
} = commonSlice.actions;
export default commonSlice.reducer;
