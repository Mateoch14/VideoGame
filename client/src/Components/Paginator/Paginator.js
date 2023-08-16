import { useSelector, useDispatch } from 'react-redux';

import { setPage } from '../../features/videogames/videogamesSlice';

import './styles.css';

const Paginator = () => {
    const dispatch = useDispatch();
    const { items, pagination, filters } = useSelector(state => state.videogames);
    const listOfItems = filters.isActive ? filters.results : items;
    const totalPages = Math.ceil(listOfItems.length / pagination.itemsPerPage);
    
    const handleOnChangePage = (page) => {
        dispatch(setPage(page));
    }

    const buildPages = () => {
        const elements = [];
        for (let i = 0; i < totalPages; i++) {
            const page = i + 1;
            const element = pagination.page === page ? (
                <button type="button" disabled className="btn">{page}</button>
            ) : (
                <button type="button" className="btn" onClick={() => handleOnChangePage(page)}>{page}</button>
            );
            elements.push(
                <li key={i}>
                   {element}
                </li>
            );
        }
        return elements.length > 0 ? (
            <ul className="paginator-items">{elements}</ul>
        ) : null;
    };
    return (
        <div className="paginator">
            {buildPages()}
        </div>
    );
};

export default Paginator;
