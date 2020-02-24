import { ADD_MESSAGE, ADD_SYSTEM_MESSAGE, SIGN_IN_SUCESSFULL, WINDOW_SIZE_SET } from './actionTypes';

export interface Message {
    player: string;
    message: string;
    time: number;
}
export interface App {
    authenticated: boolean;
    messages: Array<Message>;
    windowSize: {
        width: number,
        height: number
    }
}
export interface Dimension {
    width: number;
    height: number;
}
const INITIAL_STATE: App = {
    authenticated: false,
    messages: [],
    windowSize: {
        width: 0,
        height: 0
    }
};
interface Action {
    type: string;
    payload: any;
}

const AppReducer = (state = INITIAL_STATE, action: Action) => {
    const { payload, type } = action;
    switch (type) {
        case SIGN_IN_SUCESSFULL:
            return { ...state, authenticated: true };
        case ADD_MESSAGE:
        case ADD_SYSTEM_MESSAGE:
            const messages = state.messages;
            const newArr = [...messages, { ...payload, time: new Date().getTime() }];
            return { ...state, messages: newArr };
        case WINDOW_SIZE_SET:
            return { ...state, windowSize: payload };
        default:
            return state;
    }
};

export default AppReducer;
