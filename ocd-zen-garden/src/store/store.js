import { createStore } from 'redux';

const paletteReducer = (state = { palette: 'carnival' }, action) => {
    if(action.type === 'set') {
        return {
            counter: action.palette
        }
    }
    return state;
}

const store = createStore(paletteReducer);

const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
}

export default store;
