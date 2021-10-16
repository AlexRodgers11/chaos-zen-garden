import { createSlice } from '@reduxjs/toolkit';

const paletteSlice = createSlice({
    name: 'palette',
    initialState: {
        palette: 'Carnival'
    },
    reducers: {
        setPalette(state, action) {
            state.palette = action.payload;
        }
    }
});

export const paletteActions = paletteSlice.actions;
export default paletteSlice.reducer;