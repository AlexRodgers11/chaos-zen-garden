import { createSlice } from '@reduxjs/toolkit';

const modalContentSlice = createSlice({
    name: 'modalContent',
    initialState: {
        modalContent: 'epilepsy-warning'
    },
    reducers: {
        setModalContent(state, action) {
            state.modalContent = action.payload;
        }
    }
})

export const modalContentActions = modalContentSlice.actions;

export default modalContentSlice.reducer;