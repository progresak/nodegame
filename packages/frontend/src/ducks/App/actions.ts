import {SIGN_IN} from "./actionTypes";
import {createAction} from "../helpers";

export const signIn = (username: string) => createAction(SIGN_IN, { username });
