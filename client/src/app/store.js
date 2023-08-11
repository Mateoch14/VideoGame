import { configureStore } from '@reduxjs/toolkit';
import videogamesReducer from '../features/videogames/videogamesSlice';

export default configureStore({
    reducer: {
        videogames: videogamesReducer
    }
});