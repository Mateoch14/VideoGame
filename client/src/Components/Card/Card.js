import './styles.css'
import { Link } from 'react-router-dom'

const Card = ({title, image,description,id}) => {

    return(
        <div className="card">
            <div className='card-details'>
                <img src={image} alt={title}></img>
                <h2 className='title'>{title}</h2>
                <p className='text-title text-body'>Game #{id}</p>
                <Link to={`/detail/${id}`} className="card-button"> Ver detalle</Link>
            </div>
        </div>
    )
}

export default Card