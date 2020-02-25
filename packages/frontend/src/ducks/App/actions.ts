import { WebSocketActionTypes } from '@nodegame/shared';
import {
    ADD_MESSAGE,
    ADD_SYSTEM_MESSAGE,
    MAP_CHANGED,
    SEND_MESSAGE_TO_SERVER,
    SEND_PRIVATE_MESSAGE,
    SIGN_IN,
    SIGN_IN_SUCESSFULL,
    WINDOW_SIZE_SET
} from './actionTypes';
import { createAction, createWSAction } from '../helpers';
import { Dimension } from './reducer';

export const signIn = ({ username, password }: { username: string; password: string }) => {
    return createWSAction(SIGN_IN, WebSocketActionTypes.SignIn, { username, password });
};

export const sendMessageToServer = (message: string) => {
    return createWSAction(SEND_MESSAGE_TO_SERVER, WebSocketActionTypes.SendMsgToServer, message);
};

export const sendPrivateMessage = (message: string, username: string) => {
    return createWSAction(SEND_PRIVATE_MESSAGE, WebSocketActionTypes.SendPmToServer, { message, username });
};

export const addMessage = ({ player, message }: { player: string; message: string }) => {
    return createAction(ADD_MESSAGE, { player, message });
};

export const addSystemMessage = ({ message }: { message: string }) => {
    return createAction(ADD_SYSTEM_MESSAGE, { message });
};

export const signInSuccessfull = () => {
    return createAction(SIGN_IN_SUCESSFULL);
};

export const changeMap = () => {
    return createWSAction(MAP_CHANGED, WebSocketActionTypes.ChangeMap);
};

export const setWindowSize = (size: Dimension) => {
    return createWSAction(WINDOW_SIZE_SET, WebSocketActionTypes.SetCanvas, size);
};
