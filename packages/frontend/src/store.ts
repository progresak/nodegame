
import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from "./reducer";
import socketMiddleware from './middlewares/socketMiddleware';

export const createStore = ({ initialState = {}, middlewares = [], enhancers = [] } = {}    ) => {

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const finalMiddlewares = [
        thunk,
        // @ts-ignore
        socketMiddleware(socket), //TODO: Socket is taken from globalScope for now. It needs' to be removed
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
