import { Link, useLocation } from 'react-router-dom'
import './styles.css'

const Navbar = () => {
    const {pathname} = useLocation()
    return(
        <nav>
        <ul>
            <li>
           <Link to="/" className={pathname === '/' ? 'active' : ''}>Inicio</Link>
            </li>
            <li>
            <Link to="/add" className={pathname === '/add' ? 'active' : ''}>Agregar</Link>
            </li>
        </ul>
    </nav>
    )
}

export default Navbar