import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setGenres } from '../../features/videogames/videogamesSlice';

import { apiPost, apiGet } from '../../utils/http';

import './styles.css'

const NewGames = () => {
    const genres = useSelector(state => state.videogames.genres);
    const dispatch = useDispatch();

    useEffect(() => {
        if (genres.length === 0) {
            const fetchData = async () => {
                const genres = await apiGet('genres');
                dispatch(setGenres(genres));
            };
            fetchData();
        }
    }, [genres, dispatch]);

    const [formData, setFormData] = useState({
        name: '',
        image: 'https://placehold.co/600x400',
        description: '',
        platforms: '',
        release_date: '',
        rating: '',
    });
    const [requiredFields, setRequiredFields] = useState({});
    const [selectedGenres, setSelectedGenres] = useState({});

    const handleOnChange = (event) => {
        const { target: { value, name } } = event;

        setRequiredFields(prev => ({
            ...prev,
            [name]: value === '',
        }));

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOnCheck = (event) => {
        // console.log(event.target.checked, event.target.name);
        const { target: { name, checked, id } } = event;
        setSelectedGenres(prev => ({
            ...prev,
            [id]: {
                checked,
                name,
            },
        }));
    };

    const handleOnSubmit = () => {
        const genresChecked = Object.keys(selectedGenres).filter(item => selectedGenres[item].checked);
        const finalCheckedItems = genresChecked.map(checked => selectedGenres[checked].name);
        let countRequiredField = 0;
        Object.keys(formData).forEach(item => {
            let isRequiredField = formData[item] === '';
            if (isRequiredField) countRequiredField++;
            setRequiredFields(prev => ({
                ...prev,
                [item]: isRequiredField,
            }));
        });
        if (countRequiredField === 0) {
            const sendForm = async () => {
                formData['genres'] = finalCheckedItems;
                const { isSaved, message } = await apiPost('', formData);
                if (isSaved) {
                    setFormData({
                        name: '',
                        image: '',
                        description: '',
                        platforms: '',
                        release_date: '',
                        rating: '',
                        genres: '',
                    });
                }
                alert(message);
            };
            sendForm();
        }
    };
    return(
        <div className="form-container">
            <form>
                <div className="form-element">
                    <label>Nombre</label>
                    <input type="text" name="name" onChange={handleOnChange} value={formData.name} />
                    {requiredFields.name && <p className='form-input-error'>Este campo es obligatorio</p>}
                </div>
                <div className="form-element">
                    <label>Imagen</label>
                    <input type="text" name="image" onChange={handleOnChange} value={formData.image} readOnly />
                    {requiredFields.image && <p className='form-input-error'>Este campo es obligatorio</p>}
                </div>
                <div className="form-element">
                    <label>Descripción</label>
                    <textarea name="description"  value={formData.description} onChange={handleOnChange}></textarea>
                    {requiredFields.description && <p className='form-input-error'>Este campo es obligatorio</p>}
                </div>
                <div className="form-element">
                    <label>Plataformas</label>
                    <input type="text" name="platforms" value={formData.platforms} onChange={handleOnChange} />
                    {requiredFields.platforms && <p className='form-input-error'>Este campo es obligatorio</p>}
                </div>
                <div className="form-element">
                    <label>Fecha de lanzamiento</label>
                    <input type="date" name="release_date" value={formData.release_date} onChange={handleOnChange} />
                    {requiredFields.release_date && <p className='form-input-error'>Este campo es obligatorio</p>}
                </div>
                <div className="form-element">
                    <label>Rating</label>
                    <input type="number" name="rating" value={formData.rating} onChange={handleOnChange} max={5} min={0} />
                    {requiredFields.rating && <p className='form-input-error'>Este campo es obligatorio</p>}
                </div>
                <div className="form-element">
                    <label>Generos</label>
                    <ul className="list-genres">
                        {genres.length > 0 ? genres.map(genre => (
                            <li key={genre.id}><input type="checkbox" name={genre.name} id={genre.id} onChange={handleOnCheck} /><label htmlFor={genre.id}>{genre.name}</label></li>
                        )) : <li>Cargando géneros ...</li>}
                    </ul>





                </div>
                <div className="form-element">
                    <button type="button" className="btn" onClick={handleOnSubmit}>Agregar</button>
                </div>
            </form>
        </div>
    )
}

export default NewGames;