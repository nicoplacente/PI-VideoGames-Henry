import axios from "axios";
import {
    ALPHABETICAL_ORDER,
    CLEAR_DETAIL,
    FILTER_GAME,
    GET_CREATED,
    GET_DETAIL,
    GET_GAME_BYNAME,
    GET_GENRES,
    GET_UNCREATED,
    GET_VIDEOGAMES,
    PAGINATE,
    RATING_ORDER
} from "./actionsTypes";

export const getAllVideoGames = () => {
    try {
        return async (dispatch) => {
            const { data } = await axios.get('http://localhost:3001/videogames');
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: data
            });
        };
    } catch (error) {
        throw Error(error.message);
    };
};

export const getDetailVideoGame = (id) => {
    try {
        return async (dispatch) => {
            const { data } = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: GET_DETAIL,
                payload: data
            });
        };
    } catch (error) {
        throw Error(error.message);
    };
};

export const clearDetail = () => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: CLEAR_DETAIL
            });
        } catch (error) {
            alert(error.response.data.error);
        };
    };
};

export const getAllGenres = () => {
    try {
        return async (dispatch) => {
            const { data } = await axios.get('http://localhost:3001/genres');
            return dispatch({
                type: GET_GENRES,
                payload: data
            });
        };
    } catch (error) {
        throw Error(error.message);
    }
};

export const getGameByName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            if (data.length === 0) {
                throw new Error('Not Found');
            }
            return dispatch({
                type: GET_GAME_BYNAME,
                payload: data
            });
        } catch (error) {
            throw Error('This game does not exist');
        }
    };
};

export const fiterVideoGames = (genres) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: FILTER_GAME,
                payload: genres
            });
        } catch (error) {
            alert(error.response.data.error);
        };
    };
};

export const getCreated = () => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: GET_CREATED
            });
        } catch (error) {
            alert(error.response.data.error);
        };
    };
};

export const getUnCreated = () => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: GET_UNCREATED
            });
        } catch (error) {
            alert(error.response.data.error);
        };
    };
};

export const alphabeticalOrder = (order) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: ALPHABETICAL_ORDER,
                payload: order
            });
        } catch (error) {
            alert(error.response.data.error);
        };
    };
};

export const ratingOrder = (order) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: RATING_ORDER,
                payload: order
            });
        } catch (error) {
            alert(error.response.data.error);
        };
    };
};

export const paginateGames = (order) => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: PAGINATE,
                payload: order,
            });
        } catch (error) {
            alert(error.response.data.error);
        };
    };
};

// export const createdGame = (form) => {
//     return async (dispatch) => {
//         try {
//             axios.post('http://localhost:3001/videogames', form)
//                 .then((response) => alert('Successfully created'))
//                 .catch((error) => alert("Error creating video game"));
//             return dispatch({
//                 type: POST_GAME,
//                 payload: data
//             });
//         } catch (error) {
//             throw Error('This game does not exist');
//         }
//     };
// };