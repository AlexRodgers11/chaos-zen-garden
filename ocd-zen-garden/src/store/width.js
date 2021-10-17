import { createSlice } from '@reduxjs/toolkit';

let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const widthSlice = createSlice({
    name: 'width',
    initialState: {
        appWidth: width,
        pieceWidth: width >= 1000 ? width / 3 : width > 600 ? width / 2 : width
    },
    reducers: {
        setWidth(state, action) {
            state.appWidth = action.payload.appWidth;
            state.pieceWidth = action.payload.pieceWidth;
        }
    }
});

export const widthActions = widthSlice.actions;
export default widthSlice.reducer;