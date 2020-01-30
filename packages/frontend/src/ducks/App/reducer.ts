import { SIGN_IN_SUCESSFULL } from "./actionTypes";

interface App {
    authenticated: boolean;
}
const INITIAL_STATE: App = {
    authenticated: false,
};
interface Action {
    type: string;
    payload: any;
}

const AppReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case SIGN_IN_SUCESSFULL:
            return  { ...state, authenticated: true };
        default:
            return state
    }
};

export default AppReducer;
