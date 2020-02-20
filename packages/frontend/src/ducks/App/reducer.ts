import { ADD_MESSAGE, ADD_SYSTEM_MESSAGE, SIGN_IN_SUCESSFULL } from './actionTypes';

export interface Message {
    player: string;
    message: string;
    time: number;
}
export interface App {
    authenticated: boolean;
    messages: Array<Message>;
}
const INITIAL_STATE: App = {
    authenticated: false,
    messages: [
        {
            player: 'petr',
            message: '1',
            time: 16
        },
        {
            player: 'petr',
            message: '2',
            time: 117
        },
        {
            player: 'petr',
            message: '3',
            time: 200
        },
        {
            player: 'petr',
            message: '4',
            time: 300
        },
        {
            player: 'petr',
            message: '5',
            time: 440
        },
        {
            player: 'petr',
            message: '6',
            time: 550
        },
        {
            player: 'petr',
            message: '7',
            time: 660
        },
        {
            player: 'petr',
            message: 'posledni',
            time: 8000
        },
        {
            player: 'petr',
            message: 'posledniooo2i',
            time: 9000
        },
        {
            player: 'petr',
            message: 'pes',
            time: 90000
        },
        {
            player: 'petr',
            message: 'kocka',
            time: 90001
        },
        {
            player: 'petr',
            message: 'mews',
            time: 90002
        }
        ,
        {
            player: 'petr',
            message: 'mews',
            time: 900024
        },
        {
            player: 'petr',
            message: 'mews1',
            time: 900026
        },
        {
            player: 'petr',
            message: 'mews2',
            time: 900027
        },
        {
            player: 'petr',
            message: 'mews3',
            time: 900029
        }
    ]
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
        default:
            return state;
    }
};

export default AppReducer;
