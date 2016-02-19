import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  // Add any middleware for dev environment only
  middleware.push(logger());
}
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default createStoreWithMiddleware(reducers);
