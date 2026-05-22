import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search';

const store = configureStore({
    reducer: {
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;