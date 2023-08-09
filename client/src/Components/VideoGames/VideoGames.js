import { useEffect, useState } from 'react'
import Card from '../Card/Card'
import './styles.css'

const VideoGames = ({list}) => {
    const [gameslist, setGamesList] = useState([])
    useEffect(() => {
        setGamesList(list)
    }, [list])
    return(
        <div className='games'>
            {
                gameslist.length ? gameslist.map((games) => (
                    <Card 
                    key={games.id}
                    title={games.title}
                    description={games.description}
                    image={games.image}
                    id={games.id}
                    />
                )) : (
                    <div className='error'>
                        <h2>No hay juegos</h2>
                    </div>
                )
            }
        </div>
    )
}

export default VideoGames