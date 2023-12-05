require("dotenv").config();
const axios = require("axios");
const { Videogame, Genre } = require("../../db");
const { API_KEY } = process.env;
const {
  cleanArray,
  removeTags,
  cleanGenreVideoGame,
} = require("../../utils/Videogames/VideogameUtils");
const { Op } = require("sequelize");

const videoGamesController = async () => {
  try {
    const AllGamesNeed = 100;
    const pageGames = 20;
    const totalPageGames = Math.ceil(AllGamesNeed / pageGames);
    const resultGames = [];
    let currentPage = 1;

    while (resultGames.length < AllGamesNeed && currentPage <= totalPageGames) {
      const { data } = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}`
      );
      const videoGames = data.results;

      if (!videoGames) {
        throw new Error("No videogames information found");
      }

      const apiGames = cleanArray(videoGames);
      resultGames.push(...apiGames);

      currentPage++;
    }

    const dbVideoGames = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
      },
    });

    const cleanGame = cleanGenreVideoGame(dbVideoGames);

    return [...cleanGame, ...resultGames];
  } catch (error) {
    throw error;
  }
};

const videoGameByIdController = async (id, source) => {
  try {
    const response =
      source === "api"
        ? await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        : await Videogame.findByPk(id, {
            include: {
              model: Genre,
              attributes: ["name"],
            },
          });
    if (!response) {
      throw new Error("Videogame not found!");
    }
    const data = source === "api" ? response.data : response.toJSON();
    const gameData = {
      id: data.id,
      name: data.name,
      platforms:
        source === "api"
          ? data.platforms?.map((platform) => platform.platform.name).join(", ")
          : data.platforms,
      genres:
        source === "api"
          ? data.genres?.map((genre) => genre.name)
          : data.Genres?.map((genre) => genre.name),
      image: source === "api" ? data.background_image : data.image,
      description: removeTags(data.description),
      released: data.released,
      rating: data.rating,
      created: source === "api" ? false : data.created,
    };
    return gameData;
  } catch (error) {
    throw error;
  }
};

const videoGameByNameController = async (name) => {
  try {
    const dbGames = await Videogame.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      limit: 15,
      include: {
        model: Genre,
        attributes: ["name"],
      },
    });
    const cleanGame = cleanGenreVideoGame(dbGames);

    const { data } = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );
    const response = data.results;
    const apiGame = cleanArray(response);

    const filterApi = apiGame.filter((game) =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );
    const apiResults = filterApi.slice(0, 15);

    return [...cleanGame, ...apiResults];
  } catch (error) {
    throw error;
  }
};

const createVideoGameController = async (
  name,
  platforms,
  genres,
  image,
  description,
  released,
  rating
) => {
  try {
    if (!genres.length) {
      throw new Error("You must provide at least one genre");
    }
    const genre = await Genre.findAll({ where: { name: genres } });
    const imageUrl = image
      ? image
      : "https://www.palomacornejo.com/wp-content/uploads/2021/08/no-image.jpg";
    const newVideoGame = await Videogame.create({
      name,
      platforms,
      image: imageUrl,
      description,
      released,
      rating,
    });
    await newVideoGame.addGenres(genre);
    return newVideoGame;
  } catch (error) {
    throw error;
  }
};

// const createVideoGameController = async (
//   name,
//   platforms,
//   genres,
//   image,
//   description,
//   released,
//   rating
// ) => {
//   try {
//     if (!genres.length) {
//       throw new Error("You must provide at least one genre");
//     }
//     const existingGame = await Videogame.findOne({
//       where: { name: { [Op.iLike]: "%game.name%" }, created: true },
//     });
//     if (existingGame)
//       throw new Error(`A game called: ${game.name} already exists`);

//     const genre = await Genre.findAll({ where: { name: genres } });
//     const newVideoGame = await Videogame.create({
//       name,
//       platforms,
//       image,
//       description,
//       released,
//       rating,
//     });
//     await newVideoGame.addGenres(genre);
//     return newVideoGame;
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  videoGamesController,
  videoGameByIdController,
  videoGameByNameController,
  createVideoGameController,
  // findGameByNameController,
};
