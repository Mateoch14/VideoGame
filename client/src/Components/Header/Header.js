import { useLocation } from 'react-router-dom';
import './styles.css';
import Navbar from '../Navbar/Navbar';
import Searchbar from '../Searchbar/Searchbar';
const Header = () => {
    let {pathname} = useLocation();
    return(
        <div className="header">
            <h1>VIDEOGAMES APP</h1>
            <Navbar/>
            {
                pathname === '/home' && (
                    <>
                        <Searchbar />
                    </>
                )
            }
         </div>
    )
}

export default Header

//18690cde7edf4a1883ad327e222f3585