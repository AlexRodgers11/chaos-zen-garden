import { createSlice } from '@reduxjs/toolkit';

const organizingCounterSlice = createSlice({
    name: 'organizingCounter',
    initialState: {organizingCounter: 0},
    reducers: {
        incrementOrganizingCounter(state) {
            state.organizingCounter++;
        },
        decrementOrganizingCounter(state) {
            state.organizingCounter--;
        },
        resetOrganizingCounter(state) {
            state.organizingCounter = 0;
        }
    }
})

export const organizingCounterActions = organizingCounterSlice.actions;
export default organizingCounterSlice.reducer;