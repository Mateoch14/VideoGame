import './styles.css'
import { result } from '../../constants/Mocks'
import { useParams } from 'react-router-dom'

const Detail = () => {
    let {id} = useParams([])
    const {title,image} = result.find(res => res.id === parseInt(id,10))
    return(
        <div className='detail-receipt'>
            <h1>{title}</h1>
            <p>Maecenas hendrerit turpis nisi. Proin in finibus dui, at bibendum lectus. Vestibulum et lorem ut sapien vestibulum luctus. Aliquam vulputate suscipit leo posuere finibus. Nullam ultrices sed nulla a imperdiet. Aenean egestas lorem ac elementum semper. Sed eget lectus lacus.</p>
            <img src={image} alt={title}/>
            <p>Game number #{id}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tellus orci, pulvinar vitae mattis a, venenatis ut nibh. Praesent elementum nibh eros, condimentum porta dui auctor vitae. Integer tincidunt interdum diam, vitae rutrum leo imperdiet quis. Duis rutrum ultricies mauris nec feugiat. Mauris lorem turpis, aliquet eget ipsum eu, malesuada ultricies dolor. Maecenas pulvinar, ipsum ac consequat porttitor, orci quam placerat justo, nec gravida lectus orci vel urna. Morbi quis dapibus eros. Donec tristique varius lectus, id hendrerit nisl placerat eu. Suspendisse in erat ut velit tincidunt rutrum eu ut odio.</p>
        </div>
    )
}
 
export default Detail