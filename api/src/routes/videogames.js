const { Router } = require('express');
const axios = require('axios');
const router = Router();
require('dotenv').config();
const { API_KEY, API_URL } = process.env;

router.get('/', async (req, res) => {
    try {
        const response = await axios(`${API_URL}/games?key=${API_KEY}&page_size=50`);
        const results = response.data.results.map(({
            id, name, background_image, genres, ratings, platforms
        }) => {
            return {
                id,
                name,
                image: background_image,
                genres: genres.map((e) => e.name),
                ratings,
                platforms: platforms.map((e) => e.platform.name)
            }
        })
        res.json(results);
    } catch (error) {
        res.status(400);
    }
});

router.get('/search/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const { data } = await axios(`${API_URL}/games?search=${name}&key=${API_KEY}`);
        const results = data.results.map(({
            id, name, background_image, genres, ratings, platforms
        }) => {
            return {
                id,
                name,
                image: background_image,
                genres: genres.map((e) => e.name),
                ratings,
                platforms: platforms.map((e) => e.platform.name)
            }
        })
        res.json(results);
    } catch (error) {
        res.status(400);
    }
});

router.get('/genres', async (req, res) => {
    try {
        const { data } = await axios(`${API_URL}/genres?key=${API_KEY}`);
        res.json(data.results);
    } catch (error) {
        res.status(400);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { data } = await axios(`${API_URL}/games/${id}?key=${API_KEY}`);
        const results = {
            id: data.id,
            name: data.name,
            image: data.background_image,
            genres: data.genres.map((e) => e.name),
            description: data.description,
            released: data.released,
            rating: data.rating,
            platforms: data.platforms.map((e) => e.platform.name),
        };
        res.json(results);
    } catch (error) {
        res.status(400);
    }
});

module.exports = router;