const { Router } = require('express');
const { postVideogamesHandler } = require('../../Handlers/Videogames/videoGamesHandlers');
const postGamesRouter = Router();

postGamesRouter.post("/", postVideogamesHandler)

module.exports = postGamesRouter;