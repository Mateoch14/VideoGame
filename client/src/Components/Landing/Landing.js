import { Link } from 'react-router-dom';

import './styles.css';

const Landing = () => {
    return (
        <div className="landing">
           <div className="landing-content">
               <div>
                    <h1>VideoGames App</h1>
                    <h2>Bienvenidos a el mejor catálogo de juegos</h2>
                    <Link to="/home" className="btn">Ingresar</Link>
               </div>
           </div>
        </div>
    );
};

export default Landing;