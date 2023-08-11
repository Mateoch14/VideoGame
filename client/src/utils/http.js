const API_URL = 'http://localhost:3001';

export const apiGet = async (path) => {
    try {
        const response = await window.fetch(`${API_URL}/${path}`);
        const results = await response.json();
        return results;
    } catch (error) {
        console.log('get error >>>', error);
    }
};