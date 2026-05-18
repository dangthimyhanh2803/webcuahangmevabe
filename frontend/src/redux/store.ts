import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search';

const store = configureStore({
    reducer: {
        search: searchReducer,
    },
});

export default store;