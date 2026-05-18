import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    keyword: string;
}

const initialState: SearchState = {
    keyword: "",
};

const search = createSlice({
    name: "search",
    initialState,
    reducers: {
        setKeyword: (state, action: PayloadAction<string>) => {
            state.keyword = action.payload;
        },
        clearKeyword: (state) => {
            state.keyword = "";
        },
    },
});

export const { setKeyword, clearKeyword } = search.actions;
export default search.reducer;
