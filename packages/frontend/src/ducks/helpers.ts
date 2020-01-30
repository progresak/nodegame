export interface Action<T> {
    type: string;
    payload?: T;
}
export const createAction = <T>(type: string, payload?: T): Action<T> => ({ type, payload });
