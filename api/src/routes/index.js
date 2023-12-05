const router = require('express').Router();

const getGenresRouter = require('./Genres/genresRouter');
const getGamesRouter = require('./Videogames/getVideogameRouter');
const postGamesRouter = require('./Videogames/postVideogameRouter')
// Configurar los routers

router.use('/videogames', getGamesRouter);
router.use('/videogames/:id', getGamesRouter);
router.use('/videogames', postGamesRouter);
router.use('/genres', getGenresRouter)

module.exports = router;