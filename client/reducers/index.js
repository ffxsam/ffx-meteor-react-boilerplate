import {combineReducers} from 'redux';
import colors from './colors';

/*
 * Now finally, we have all our reducers we're going to use in this app, and
 * we're going to combine them. It's like organizing all of our workers in one
 * enclosed store so that the manager (Redux action dispatcher) can yell at all
 * of them. :)
 */
export default combineReducers({
  colors,
  // You would list more reducers here if you had them
});

/*
 * Now go to /client/containers/ColorSetterContainer.jsx and we'll see how all
 * this Redux stuff ties in with React.
 */
