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
    return(
        <div className='detail-receipt'>
            <h1>{videogameData.title}</h1>
            <img src={videogameData.image} alt={videogameData.title} />
            <div dangerouslySetInnerHTML={{ __html: videogameData.description }}></div>
        </div>
    )
}
 
export default Detail