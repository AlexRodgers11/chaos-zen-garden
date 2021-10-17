import { createSlice } from '@reduxjs/toolkit';

const fullViewSlice = createSlice({
    name: 'fullView',
    initialState: {
        fullView: null
    },
    reducers: {
        setFullView(state, action) {
            if(state.fullView) {
                state.fullView = null
            } else {
                state.fullView = action.payload
            }
        }
    }
});

export const fullViewActions = fullViewSlice.actions;
export default fullViewSlice.reducer;