import './styles.css';
import { Link } from 'react-router-dom';

const Card = ({title, image, description ,id}) => {

    return(
        <div className="card">
            <div className='card-details'>
                <img src={image} alt={title}></img>
                <h2 className='title'>{title}</h2>
                <p>Game #{id}</p>
                <Link to={`/detail/${id}`} className="btn"> Ver detalle</Link>
            </div>
        </div>
    )
}

export default Card