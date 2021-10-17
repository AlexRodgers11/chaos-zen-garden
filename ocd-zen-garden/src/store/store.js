// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import paletteSlice from './palette';
import organizingCounterSlice from './organizing-counter';
import widthSlice from './width';
import fullViewSlice from './full-view';

// const initialState = {
//     palette: 'carnival',
//     organizingCounter: 0
// }

const store= configureStore({
    reducer: {
        palette: paletteSlice,
        counter: organizingCounterSlice,
        width: widthSlice,
        fullView: fullViewSlice
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