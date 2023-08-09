
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
                className='input input-alt'
                type="text"
                onChange={handleOnChange}
                placeholder="Filtrar por título"
                id="searcher"
            />
             <span className="input-border input-border-alt"></span>
            {searcher !== '' && <p><b>Buscando:</b> {searcher}</p>}
        </div>
    )
}

export default Searchbar