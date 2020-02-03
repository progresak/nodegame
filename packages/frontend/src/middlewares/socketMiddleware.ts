
interface IOInterface {
    emit: (action: string, payload: any) => IOInterface;
}
const createSocketMiddleware = (io: IOInterface) => {

    // @ts-ignore
    return () => next => action => {
        const { payload, websocketAction } = action;

        if (websocketAction) {
            io.emit(websocketAction, payload);
        }

        next(action);
    };
};

export default createSocketMiddleware;
