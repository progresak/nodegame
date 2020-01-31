import IO from 'socket.io-client';

const socketMiddleware = (url: string) => ({ dispatch }) => next => action => {
    const socket = IO(url);
    socket.on("signUpResponse", message => {
        console.log("BUT - I am not recieving it here :/", {message});
        dispatch({
            type : "SOCKET_MESSAGE_RECEIVED",
            payload : message
        });
    });
    return next => action => {
        if(action.type == "SEND_WEBSOCKET_MESSAGE") {
            socket.send(action.payload);
            return;
        }

        return next(action);
    }
};

export default socketMiddleware;
