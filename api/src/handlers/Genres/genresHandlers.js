const getGenresController = require("../../controllers/Genres/genresController");
const { Genre } = require('../../db');

const getGenresHandler = async (req, res) => {
    try {
        const existGenres = await Genre.findAll();
        if (!existGenres.length) {
            const genresData = await getGenresController()
            await Genre.bulkCreate(genresData);
        }
        const allGenres = await Genre.findAll();
        res.status(200).json(allGenres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getGenresHandler;