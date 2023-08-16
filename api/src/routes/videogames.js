const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const router = Router();
require('dotenv').config();

const { Sequelize } = require('sequelize');

const { Videogame, Genres } = require('../db');

uuidv4();

const { API_KEY, API_URL } = process.env;

router.get('/', async (req, res) => {
    try {
        const localData = await Videogame.findAll();
        const response = await axios(`${API_URL}/games?key=${API_KEY}&page_size=100`);
        let results = response.data.results.map(({
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
        });
        results = [
            ...localData,
            ...results,
        ];
        res.json(results);
    } catch (error) {
        res.status(400);
    }
});

router.get('/search/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const { data } = await axios(`${API_URL}/games?search=${name}&key=${API_KEY}`);
        let results = data.results.map(({
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
        });
        // Buscar en local también
       const localData = await Videogame.findAll({
            where: {
                title: {
                    [Sequelize.Op.iLike]: `%${name}%`,
                },
            }
        });
        if (localData.length > 0) {
            results = [
                ...localData,
                ...results,
            ];
        }
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

router.post('/', async (req, res) => {
    try {
        // name, description, genres, id, image, platforms, rating, released
        const { name, description, genres, image, platforms, rating, release_date } = req.body;
        // Se guardan los datos en la base de datos y luego se devuelve un mensaje de estado (success / error)
        const request = await Videogame.create({
           title: name,
            description,
            genres,
            image,
            platforms,
            rating,
            release_date,
            id: uuidv4(),
        });
        const genresDb = await Genres.findAll({
            where: {
                title: {
                    [Sequelize.Op.in]: [genres],
                },
            },
        });
        await request.setGenres(genresDb);
        res.json({ isSaved: true, message: 'Los datos se han guardado de manera exitosa' });
    } catch (error) {
        console.log('error', error);
        res.json({ isSaved: false, message: 'Ha ocurrido un error y no se ha podido procesar la información' });
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
        try {
            const data = await Videogame.findAll({
                where: {
                    id: id,
                }
            });
            const { title: name, description, platforms, image, rating, release_date } = data[0];
            res.json({
                id,
                name,
                description,
                platforms,
                image,
                rating,
                release_date,
            });
        } catch (error2) {
            console.log('Error2', error2);
            res.status(400).json({});
        }
    }
});

module.exports = router;