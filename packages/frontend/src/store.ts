
import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from "./reducer";
import socketMiddleware from './middlewares/socketMiddleware';
import {SOCKET_SERVER_URL} from "./configuration";

export const createStore = ({ initialState = {}, middlewares = [], enhancers = [] } = {}    ) => {

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const finalMiddlewares = [
        thunk,
        socketMiddleware(SOCKET_SERVER_URL),
        ...middlewares,
    ];

    return createReduxStore(
        reducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...finalMiddlewares),
            ...enhancers,
        )
    );
};

export default createStore();
