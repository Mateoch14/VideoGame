const API_URL = 'http://localhost:3001/videogames';

export const apiGet = async (path) => {
    try {
        const response = await fetch(`${API_URL}/${path}`, {
            method: 'GET',
        });
        const results = await response.json();
        return results;
    } catch (error) {
        console.log('get error >>>', error);
    }
};

export const apiPost = async (path, body) => {
    try {
        const response = await fetch(`${API_URL}/${path}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const results = await response.json();
        return results;
    } catch (error) {
        console.log('post error >>>', error);
    }
};