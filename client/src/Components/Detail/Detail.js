import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { apiGet } from '../../utils/http';

import './styles.css';

const Detail = () => {
    const { id } = useParams([]); // useParams se usa para obtener los valopres de la url
    const [videogameData, setVideogameData] = useState({}); 

    useEffect(() => {
        const fetchData = async () => {
            const data = await apiGet(id);
            setVideogameData(data);
        };
        fetchData();
    }, [id]);
    const platforms = videogameData?.platforms;
    return(
        <div className='detail-receipt'>
            <h1>{videogameData.name}</h1>
            <img src={videogameData.image} alt={videogameData.title} />
            <h2>Rating: {videogameData.rating}</h2>
            <ul>{Array.isArray(platforms) ? platforms?.map((platform, index) => {
                return (
                    <li key={index}>
                        {platform}
                    </li>
                )
            }) : <li>{platforms}</li>}</ul>
            <div dangerouslySetInnerHTML={{ __html: videogameData.description }}></div>
        </div>
    )
}
 
export default Detail