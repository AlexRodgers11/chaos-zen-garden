import { createSlice } from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        loggedIn: false
    },
    reducers: {
        toggleLogInStatus(state) {
            state.loggedIn = !state.loggedIn
        }
    }
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;