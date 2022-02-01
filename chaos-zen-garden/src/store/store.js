// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import paletteSlice from './palette';
import organizingCounterSlice from './organizing-counter';
import sizeSlice from './size';
import fullViewSlice from './full-view';
import volumeSlice from './volume';
import authenticationSlice from './authentication';
import highlightUserIconSlice from './highlight-user-icon';
import modalContentSlice from './modal-content';
import gardenSlice from './garden';

// const initialState = {
//     palette: 'carnival',
//     organizingCounter: 0
// }

const store= configureStore({
    reducer: {
        palette: paletteSlice,
        organizingCounter: organizingCounterSlice,
        size: sizeSlice,
        // fullView: fullViewSlice,
        volume: volumeSlice,
        authentication: authenticationSlice,
        highlightUserIcon: highlightUserIconSlice,
        modalContent: modalContentSlice,
        garden: gardenSlice
    }
})



export default store;

// const paletteReducer = (state = initialState, action) => {
//     switch (initialState) {
//         case 'setPalette':
//             return {
//                 palette: action.palette,
//                 organizingCount: state.organizingCounter
//             }
//         case 'incrementOrganizingCounter':
//             return {
//                 palette: state.palette,
//                 organizingCounter: state.organizingCounter + 1
//             }
//         case 'decrementOrganizingCounter':
//             return {
//                 palette: state.palette,
//                 organizingCounter: state.organizingCounter - 1
//             }
//         default:
//             return state;
//     }
// }

// const store = createStore(paletteReducer);