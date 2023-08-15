import { useState } from 'react';

import { apiPost } from '../../utils/http';

import './styles.css'

const NewGames = () => {

    const [formData, setFormData] = useState({
        name: '',
        image: 'https://placehold.co/600x400',
        description: '',
        platforms: '',
        release_date: '',
        rating: '',
        genres: '',
    });
    const [requiredFields, setRequiredFields] = useState({});

    const handleOnChange = (event) => {
        const { target: { value, name } } = event;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOnSubmit = () => {
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
                    <input type="text" name="genres"  value={formData.genres} onChange={handleOnChange} />
                    {requiredFields.genres && <p className='form-input-error'>Este campo es obligatorio</p>}
                </div>
                <div className="form-element">
                    <button type="button" className="btn" onClick={handleOnSubmit}>Agregar</button>
                </div>
            </form>
        </div>
    )
}

export default NewGames;