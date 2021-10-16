import { createSlice } from '@reduxjs/toolkit';

const organizingCounterSlice = createSlice({
    name: 'organizingCounter',
    initialState: 0,
    reducers: {
        incrementOrganizingCounter(state, action) {
            state.counter++;
        },
        decrementOrganizingCounter(state, action) {
            state.counter--;
        }
    }
})

export const organizingCounterActions = organizingCounterSlice.actions;
export default organizingCounterSlice.reducer;