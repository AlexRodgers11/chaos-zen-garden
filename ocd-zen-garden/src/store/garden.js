import { createSlice } from '@reduxjs/toolkit';
import startingGarden from '../garden-seed';

const gardenSlice = createSlice({
    name: 'garden',
    initialState: {
        garden: startingGarden
    },
    reducers: {
        //happens when user logs out or goes away from garden main page (but not when going to full window)
        resetStartingGarden(state) {
            state.garden = startingGarden
        }, 
        updateGardenPiece(state, action) {
            state.garden = {...state.garden, [action.payload.id]: action.payload.specs}
        },
        setGarden(state, action) {
            state.garden = action.payload;
        }
    }
});

export const gardenActions = gardenSlice.actions;

export default gardenSlice.reducer;