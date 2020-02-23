import { compose, get, sortBy } from 'lodash/fp';

const getParentApp = get('app');

export const getAllMessages = compose(sortBy('time'), get('messages'), getParentApp);

export const isAuthenticated = compose( Boolean, get('authenticated'), getParentApp);
