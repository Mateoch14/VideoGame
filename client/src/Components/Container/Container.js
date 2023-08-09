import Footer from "../Footer/Footer"
import Header from "../Header/Header"

import './styles.css'

const Container = ({children, onSearch,onOrder}) => {

    return(
        <div className="container">
            <Header onSearch={onSearch} onOrder={onOrder}/>
            {children}
            <Footer/>
        </div>
    )
}

export default Container