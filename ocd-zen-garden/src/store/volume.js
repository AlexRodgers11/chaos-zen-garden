import { createSlice } from '@reduxjs/toolkit';

const volumeSlice = createSlice({
    name: 'volume',
    initialState: {volume: 65},
    reducers: {
        setVolume(state, action) {
            state.volume = action.payload;
        }
    }
});

export const volumeActions = volumeSlice.actions;

export default volumeSlice.reducer;