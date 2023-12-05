const cleanArray = (arr) =>
    arr.map((data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description_raw,
            platforms: data.platforms.map(platform => platform.platform.name).join(', '),
            genres: data.genres.map(genres => genres.name),
            image: data.background_image || data.image,
            released: data.released,
            rating: data.rating,
            created: false
        }
    });

const removeTags = (description) => {
    const tagRegExp = new RegExp('<\s*[^>]*>', 'g');
    description = description.replace(tagRegExp, '');
    return description;
}

const cleanGenreVideoGame = (arr) => {
    return arr.map((game) => {
        const formattedGame = game.toJSON();
        formattedGame.genres = game.Genres.map((genre) => genre.name);
        delete formattedGame.Genres;
        return formattedGame;
    });
};

module.exports = {
    cleanArray,
    removeTags,
    cleanGenreVideoGame
};