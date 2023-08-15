
import { useState } from 'react';
import './styles.css';

const Searchbar = ({onChange}) =>{
    const [searcher, setSearcher] = useState('');
    const handleOnChange = () => {
        const value = document.getElementById('searcher').value;
        setSearcher(value);
        onChange(value);
    };
    return(
        <div className='form-control'>
            <input 
                type="text"
                onChange={handleOnChange}
                placeholder="Filtrar por título"
                id="searcher"
            />
            {searcher !== '' && <p><b>Buscando:</b> {searcher}</p>}
        </div>
    )
}

export default Searchbar