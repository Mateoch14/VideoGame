import { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { setItems } from '../../features/videogames/videogamesSlice';
import { apiGet } from '../../utils/http';
import Card from '../Card/Card';
import './styles.css';

const VideoGames = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const items = await apiGet('/');
            dispatch(setItems(items));
        };
        fetchData();
        
    }, [dispatch]);

    const gameslist = useSelector(state => state.videogames.items);
    return(
        <div className='games'>
            {
                gameslist.length ? gameslist.map((games) => (
                    <Card 
                    key={games.id}
                    title={games.name || games.title}
                    description={games.description}
                    image={games.image}
                    id={games.id}
                    />
                )) : (
                    <div className='error'>
                        <h2>Cargando...</h2>
                    </div>
                )
            }
        </div>
    )
}

export default VideoGames