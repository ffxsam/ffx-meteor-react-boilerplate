import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middleware = [thunk];
let devtools;

if (process.env.NODE_ENV === 'development') {
  // Add any middleware for dev environment only
  if (window.devToolsExtension) {
    devtools = window.devToolsExtension();
  } else {
    middleware.push(logger());
    devtools = f => f;
  }
} else {
  devtools = f => f;
}

export default createStore(
  reducers,
  compose(
    applyMiddleware(...middleware),
    devtools
  )
)
