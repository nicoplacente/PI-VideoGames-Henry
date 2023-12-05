const { Router } = require('express');
const getGenresHandler = require('../../handlers/Genres/genresHandlers');
const getGenresRouter = Router();

getGenresRouter.get("/", getGenresHandler)

module.exports = getGenresRouter;