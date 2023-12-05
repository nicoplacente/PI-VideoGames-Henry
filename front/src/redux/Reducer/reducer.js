import { ALPHABETICAL_ORDER, CLEAR_DETAIL, FILTER_GAME, GET_CREATED, GET_DETAIL, GET_GAME_BYNAME, GET_GENRES, GET_UNCREATED, GET_VIDEOGAMES, PAGINATE, RATING_ORDER } from "../Actions/actionsTypes";

const initialState = {
    videoGames: [],
    pageVideoGames: [],
    allVideoGames: [],
    detail: [],
    genres: [],
    currentPage: 0
};

const rootReducer = (state = initialState, action) => {
    const ITEMS_PER_PAGE = 15;
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videoGames: [...action.payload].splice(0, ITEMS_PER_PAGE),
                pageVideoGames: action.payload,
                allVideoGames: action.payload,
            };

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            };

        case CLEAR_DETAIL:
            return {
                ...state,
                detail: []
            };

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            };

        case GET_GAME_BYNAME:
            return {
                ...state,
                videoGames: action.payload
            };

        // Filter genre
        case FILTER_GAME:
            const filteredGames = state.allVideoGames.filter((game) => {
                return game.genres.includes(action.payload);
            });
            return {
                ...state,
                pageVideoGames: [...filteredGames],
                videoGames: filteredGames.splice(0, ITEMS_PER_PAGE),
            };

        case GET_CREATED:
            const createdGames = state.allVideoGames.filter((game) => game.created === true);
            return {
                ...state,
                videoGames: createdGames.splice(0, ITEMS_PER_PAGE),
                pageVideoGames: createdGames
            };

        case GET_UNCREATED:
            const uncreatedGames = state.allVideoGames.filter((game) => game.created === false);
            return {
                ...state,
                videoGames: uncreatedGames.splice(0, ITEMS_PER_PAGE),
                pageVideoGames: uncreatedGames
            };

        case ALPHABETICAL_ORDER:
            let sortedList = [...state.pageVideoGames].sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();

                if (action.payload === 'Up') {
                    return nameA.localeCompare(nameB);
                } else if (action.payload === 'Fall') {
                    return nameB.localeCompare(nameA);
                }
            });

            return {
                ...state,
                videoGames: sortedList.splice(0, ITEMS_PER_PAGE),
                pageVideoGames: sortedList
            };

        case RATING_ORDER:
            let sortedRating = [...state.pageVideoGames].sort((a, b) => {
                if (action.payload === 'Upward') {
                    return a.rating - b.rating;
                } else if (action.payload === 'Falling') {
                    return b.rating - a.rating;
                };
            });
            if (Object.keys(sortedRating).length <= 15) {
                return {
                    ...state,
                    videoGames: sortedRating,
                    pageVideoGames: sortedRating
                };
            } else {
                return {
                    ...state,
                    videoGames: sortedRating.splice(0, ITEMS_PER_PAGE),
                    pageVideoGames: sortedRating
                };
            };

        case PAGINATE:
            const nextPage = state.currentPage + 1;
            const prevPage = state.currentPage - 1;
            const firstIndex = action.payload === "next" ? nextPage * ITEMS_PER_PAGE : prevPage * ITEMS_PER_PAGE;

            if (action.payload === 'next' && firstIndex >= state.pageVideoGames.length) {
                return state
            } else if (action.payload === "prev" && prevPage < 0) {
                return state
            };

            return {
                ...state,
                videoGames: [...state.pageVideoGames].splice(firstIndex, ITEMS_PER_PAGE),
                currentPage: action.payload === "next" ? nextPage : prevPage,
            };

        default:
            return { ...state }
    };
};

export default rootReducer;