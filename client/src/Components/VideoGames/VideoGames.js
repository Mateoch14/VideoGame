import { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { setItems, setIsLoading } from '../../features/videogames/videogamesSlice';
import { apiGet } from '../../utils/http';
import Card from '../Card/Card';
import Paginator from '../Paginator/Paginator';
import './styles.css';

const VideoGames = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            dispatch(setIsLoading(true));
            const items = await apiGet('/');
            dispatch(setItems(items));
            dispatch(setIsLoading(false));
        };
        fetchData();
        
    }, [dispatch]);

    const gameslist = useSelector(state => state.videogames.pagination.results);
    const filters = useSelector(state => state.videogames.filters);
    const isLoading = useSelector(state => state.videogames.isLoading);
    const listToDisplay = filters.isActive ? gameslist : gameslist;
    return(
        <>
            <Paginator />
            <div className='games'>
                {
                    listToDisplay.length ? listToDisplay.map((games) => (
                        <Card 
                        key={games.id}
                        title={games.name || games.title}
                        description={games.description}
                        image={games.image}
                        id={games.id}
                        />
                    )) : isLoading ? (
                        <div className='error'>
                            <h3>Cargando ...</h3>
                        </div>
                    ) : (
                        <div className='error'>
                            <h3>No se han encontrado resultados de momento.</h3>
                        </div>
                    )
                }
            </div>
            <Paginator />
        </>
    )
}

export default VideoGames