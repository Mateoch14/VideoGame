import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, setGenres, setFilters } from '../../features/videogames/videogamesSlice';
import { apiGet } from '../../utils/http';

import './styles.css';

const Searchbar = () => {
    const dispatch = useDispatch();
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [data, setData] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const listOfGenres = useSelector(state => state.videogames.genres);
    const handleOnChange = (event) => {
        setData(event.target.value);
    };
    const handleOnSearch = () => {
       if (data !== '') {
            const fetchData = async () => {
                const response = await apiGet(`search/${data}`);
                dispatch(setItems(response));
                setIsSearch(true);
            };
            fetchData();
        }
    };
    const handleOnclearResults = () => {
        const fetchData = async () => {
            const response = await apiGet('');
            dispatch(setItems(response));
            setIsSearch(false);
        };
        fetchData();
    };
    const handleOnSelectFilter = ({ target }) => {
        const { name, checked } = target;
        const filters = {
            ...appliedFilters,
            [name]: checked,
        };
        dispatch(setFilters(filters));
        setAppliedFilters(filters);
    };
    useEffect(() => {
        const fetchGenres = async () => {
            const genres = await apiGet('genres');
            dispatch(setGenres(genres));
        };
        fetchGenres();
    }, [dispatch]);
    return(
        <div className='search-bar'>
            <div>
                <input 
                    type="text"
                    placeholder="Ingresa un título"
                    id="searcher"
                    name="searcher"
                    className="searcher"
                    onChange={handleOnChange}
                />
                <button type="button" className="btn" onClick={handleOnSearch}>Buscar</button>
                {isSearch && <button type="button" onClick={handleOnclearResults} className="btn-clear">Limpiar resultados</button>}
            </div>
            <div>
                <p><b>Filtrar por género</b></p>
                <ul className="filters">
                    {
                        listOfGenres.map(({ id, name }) => (
                            <li key={id}>
                                <input type="checkbox" id={name} name={name} onChange={handleOnSelectFilter} />
                                <label htmlFor={name}>{name}</label>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Searchbar