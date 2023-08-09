import { useLocation } from 'react-router-dom'
import './styles.css'
import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Searchbar from '../Searchbar/Searchbar'
const Header = ({onSearch, onOrder}) => {
    let {pathname} = useLocation()
    const [orderBy, setOrderBy] = useState('title')
    const handleOndOrder = () => {
        setOrderBy(orderBy === 'title' ? 'id' : 'title')
        onOrder(orderBy)
    }
    return(
        <div className="header">
            <h1>Video Games</h1>
            <Navbar/>
            {
                pathname === '/' && (
                    <>
                        <Searchbar
                            onChange={onSearch}
                        />
                        <button className='buttonh' type='button' onClick={handleOndOrder}>
                            Ordenar {orderBy === 'title' ? 'alfabéticamente' : 'por ID'}
                        </button>
                    </>
                )
            }
         </div>
    )
}

export default Header

//18690cde7edf4a1883ad327e222f3585