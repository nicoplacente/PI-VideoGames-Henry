require('dotenv').config();
const { API_KEY } = process.env;
const cleanArrayGenres = require("../../utils/Genres/GenresUtils");
const axios = require('axios');

const getGenresController = async () => {
    try {
        const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genres = data.results;
        if (!genres) {
            throw new Error('No Genres information found');
        }
        const genresData = cleanArrayGenres(genres)
        return [...genresData];
    } catch (error) {
        throw error;
    }
};

module.exports = getGenresController;