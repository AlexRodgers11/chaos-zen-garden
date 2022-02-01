import { createSlice } from '@reduxjs/toolkit';

const highlightUserIconSlice = createSlice({
    name: 'highlightUserIcon',
    initialState: {
        highlightUserIcon: false
    },
    reducers: {
        toggleHighlightUserIcon(state) {
            state.highlightUserIcon = !state.highlightUserIcon;
        } 
    }
})

export const highlightUserIconActions = highlightUserIconSlice.actions;

export default highlightUserIconSlice.reducer;