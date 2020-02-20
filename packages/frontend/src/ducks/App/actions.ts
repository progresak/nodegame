import { ADD_MESSAGE, ADD_SYSTEM_MESSAGE, SEND_MESSAGE_TO_SERVER, SEND_PRIVATE_MESSAGE, SIGN_IN } from './actionTypes';
import { createAction, createWSAction } from '../helpers';

export const signIn = ({ username, password }: { username: string; password: string }) => {
    return createWSAction(SIGN_IN, 'signIn', { username, password });
};

export const sendMessageToServer = (message: string) => {
    return createWSAction(SEND_MESSAGE_TO_SERVER, 'sendMsgToServer', message);
};

export const sendPrivateMessage = (message: string, username: string) => {
    return createWSAction(SEND_PRIVATE_MESSAGE, 'sendPmToServer', { message, username });
};

export const addMessage = ({ player, message }: { player: string; message: string }) => {
    return createAction(ADD_MESSAGE, { player, message });
};

export const addSystemMessage = ({ message }: { message: string }) => {
    return createAction(ADD_SYSTEM_MESSAGE, { message });
};
