import { ADD_MESSAGE, SIGN_IN_SUCESSFULL } from './actionTypes';

export interface Message {
    player: string;
    message: string;
    time: number;
}
interface App {
    authenticated: boolean;
    messages: Array<Message>;
}
const INITIAL_STATE: App = {
    authenticated: false,
    messages: []
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
            const messages = state.messages;
            const newArr = [...messages, { ...payload, time: new Date().getTime() }];
            return { ...state, messages: newArr };
        default:
            return state;
    }
};

export default AppReducer;
