import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../Reducer/reducer";
import thunkMiddleware from "redux-thunk"

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhacer(applyMiddleware(thunkMiddleware))
);

export default store;