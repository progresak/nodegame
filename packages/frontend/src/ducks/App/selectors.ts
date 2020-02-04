import { RootState } from '../../reducer';

export const getAllMessages = (state: RootState) => state.app.messages;
