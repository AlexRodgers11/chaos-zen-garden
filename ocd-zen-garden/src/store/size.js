import { createSlice } from '@reduxjs/toolkit';

let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

const sizeSlice = createSlice({
    name: 'size',
    initialState: {
        appWidth: width,
        pieceWidth: width >= 1000 ? width / 3 : width > 600 ? width / 2 : width,
        appHeight: height,
        fullView: null
    },
    reducers: {
        setSize(state, action) {
            state.appWidth = action.payload.appWidth;
            state.appHeight = action.payload.appHeight;
            if(state.fullView) {
                state.pieceWidth = action.payload.appWidth > action.payload.appHeight ? action.payload.appHeight - 47 : action.payload.appWidth - 2;
            } else {
                state.pieceWidth = state.appWidth >= 1000 ? state.appWidth / 3 : state.appWidth > 600 ? state.appWidth / 2 : state.appWidth;
            }
        },
        setFullView(state, action) {
            if(state.fullView) {
                state.fullView = null;
                state.pieceWidth = state.appWidth >= 1000 ? state.appWidth / 3 : state.appWidth > 600 ? state.appWidth / 2 : state.appWidth;
            } else {
                state.fullView = action.payload;
                state.pieceWidth = state.appWidth > state.appHeight ? state.appHeight - 47 : state.appWidth - 2;
            }
        }
    }
});

export const sizeActions = sizeSlice.actions;
export default sizeSlice.reducer;