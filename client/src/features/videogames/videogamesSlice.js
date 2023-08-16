import { createSlice, current } from '@reduxjs/toolkit';

const itemsPerPage = 15;

const initialState = {
    isLoading: false,
    items: [],
    pagination: {
        page: null,
        results: [],
        itemsPerPage,
    },
    genres: [],
    filters: {
        isActive: false,
        results: [],
        itemsResults: [],
    },
};

const videogamesSlice = createSlice({
    name: 'videogames',
    initialState,
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setItems(state, action) {
            state.items = action.payload;
             // For pagination
            state.pagination.page = 1;
            state.pagination.results = action.payload.slice(0, itemsPerPage);
        },
        setPage(state, action) {
            const { items, filters: { isActive, results } } = current(state);
            const startItemPosition = (action.payload - 1) * itemsPerPage;
            const finalItemPosition = startItemPosition + itemsPerPage;
            const currentPageItems = (isActive ? results : items ).slice(startItemPosition, finalItemPosition);
            state.pagination.page = action.payload;
            state.pagination.results = currentPageItems;
        },
        setGenres(state, action) {
            state.genres = action.payload;
        },
        setFilters(state, action) {
            // Convierto el array el objeto recibido y dejo solo los elementos en TRUE
            const filters = Object.keys(action.payload).filter(item => {
                return action.payload[item];
            });
            // Objtengo tooodos los items para aplicar el filtro antes del paginado
            const currentItems = current(state).items;
            const filteredItems = filters.length > 0 ? currentItems.filter(
                ({ genres }) => {
                    let appliedFilters = [];
                    if (genres && genres.length) {
                        appliedFilters = genres.filter(genre => filters.includes(genre));
                    }
                    return appliedFilters.length;
                }
            ) : currentItems;

            // Ahora tengo que ver la página
            state.pagination.page = 1;
            state.pagination.results = filteredItems.slice(0, itemsPerPage);
            state.filters.isActive = filters.length > 0;
            state.filters.results = filteredItems;
        } 
    },
});

export const { setItems, setPage, setGenres, setFilters, setIsLoading } = videogamesSlice.actions;

export default videogamesSlice.reducer;