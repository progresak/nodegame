import { compose, get, tap, sortBy } from 'lodash/fp';

const getParentApp = get('app');

export const getAllMessages = compose(sortBy('time'), tap(console.log), get('messages'), getParentApp);
