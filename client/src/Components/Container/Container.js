import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './styles.css';

const Container = ({ children }) => {

    return(
        <div className="container">
            <Header/>
            <main className="main-container">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default Container