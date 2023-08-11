import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const videogamesSlice = createSlice({
    name: 'videogames',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
});

export const { setItems } = videogamesSlice.actions;

export default videogamesSlice.reducer;