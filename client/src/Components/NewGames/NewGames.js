import './styles.css'

const NewGames = () => {
    return(
        <div>
            <form  action="" className="containerform">
                <div className='input-containerform'>
                    <div className="input-content">
                        <div className="input-dist">
                        <span id="SubscribeTXT">New Game</span>
                            <div className="input-type">
                                <label htmlFor="titulo">Título:</label>
                                <input type="text" id="titulo" name="titulo" required />
                                <label htmlFor="descripcion">Descripción:</label>
                                <textarea id="descripcion" name="descripcion" required></textarea>
                                <label htmlFor="imagen">Imagen:</label>
                                <input type="file" id="imagen" name="imagen" accept="image/*" required />
                            </div>
                            <button type='button' className='form-submit-btn'>Enviar</button>
                         </div>
                    </div>
                </div>
                
            </form>
            </div>
    )
}

export default NewGames;