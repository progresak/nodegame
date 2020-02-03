import { SIGN_IN } from "./actionTypes";
import { createWSAction } from "../helpers";

export const signIn = ({ username, password }: {username: string, password: string}) => {
    return createWSAction(SIGN_IN, 'signIn' ,{ username, password });
};
