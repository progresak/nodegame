export interface Action<T> {
    type: string;
    payload?: T;
}
export interface ActionWS<T> extends Action<T>{
    websocketAction: string;
}
export const createAction = <T>(type: string, payload?: T): Action<T> => ({ type, payload });

export const createWSAction = <T>(type: string, websocketAction: string, payload?: T): ActionWS<T> => ({ type, websocketAction, payload });
