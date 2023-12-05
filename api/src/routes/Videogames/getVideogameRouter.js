const { Router } = require('express');
const {
    getVideogamesByNameHandler,
    getVideogamesByIdHandler
} = require('../../Handlers/Videogames/videoGamesHandlers');

const getGamesRouter = Router();

getGamesRouter.get("/", getVideogamesByNameHandler);
getGamesRouter.get("/:id", getVideogamesByIdHandler);

module.exports = getGamesRouter;