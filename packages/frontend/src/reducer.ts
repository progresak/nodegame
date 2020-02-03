import { combineReducers } from 'redux';
import AppReducer from './ducks/App/reducer';

const reducer = combineReducers({
    app: AppReducer,
});

export type RootState = ReturnType<typeof reducer>


export default reducer;
