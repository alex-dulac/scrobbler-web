import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    activeTab: 'user',
    scrobbling: false,
    currentSong: null
};

const actionTypes = {
    SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
};

const actions = {
    setActiveTab: (tab: string) => ({
        type: actionTypes.SET_ACTIVE_TAB,
        payload: tab,
    }),
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_ACTIVE_TAB:
            return { ...state, activeTab: action.payload };
        default:
            return state;
    }
};

const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { actionTypes, actions, store };