/*
 * The big piece of the puzzle for Redux: reducers!
 *
 * Think of a reducer as a worker standing in front of a wooden statue. The
 * manager yells out a command, like "paint the statue blue, and put a top hat
 * on its head!" and the worker responds by painting the statue blue, and
 * placing a top hat on its head. Moments later, the manager yells out "I've got
 * new instructions! Paint the statue gold, and replace the top hat with a
 * fedora!" The worker reacts to this by painting the statue gold, and swapping
 * out the top hat with a fedora. The worker doesn't always have to change both
 * the color and the hat. The manager might shout "leave the hat alone, just
 * paint the statue orange!" and the worker (reducer) will do that.
 *
 * (PS: why does our manager yell so much?! there's a reason, which will be
 * explained momentarily)
 *
 * So to connect our analogy to the real world, the worker is a reducer, and
 * the manager is shouting Redux actions. An action is "shouted" out by Redux,
 * our reducer considers the current state of the statue, and modifies the state
 * based on what the action (and arguments) says to do.
 *
 * Note that this particular worker (reducer) *only* focuses on the wooden
 * statue! There might be other workers in the store doing other things. If the
 * manager shouts out "boil the pot of water!", our reducer that's focused on
 * the wooden statue does indeed hear the command, but doesn't do anything
 * because it's not her job.
 *
 * So to summarize: the reducer takes the current state, says "Ok, I see that
 * the right sidebar is closed, and now I have an action that says to open it.
 * I'll return the new state which says the right sidebar is now open." The
 * reducer does *not* actually open the right sidebar, and neither does the
 * Redux action. That's the React container's job, but we'll get into that, and
 * we'll expand our analogy a bit more.
 */

// Import the color actions
import * as actions from '../actions/colors';

/*
 * This is our initial app state for the current color that the user is
 * creating. Remember that we could have several reducers that are all separate.
 * This reducer (colors) is *only* concerned with color related stuff, so your
 * state variables (Rvalue, etc) can be at the root level of this state object.
 * You don't have to do:
 *
 *   const initialState = {color: {Rvalue: 255, Gvalue: 255, Bvalue: 255}};
 *
 * because /client/reducers/index.js is already combining all reducers and
 * categorizing them into their own "namespaces." Though it wouldn't hurt to put
 * the R/G/B values into their own object so the errorReason is totally
 * separate. Later you'll see why this might've been a good idea.
 */
const initialState = {
  Rvalue: 255,
  Gvalue: 255,
  Bvalue: 255,
  errorReason: null,
};

// Just a helper function to restrict RGB values between 0-255
function limitRgbVal(value) {
  return Math.max(Math.min(value, 255), 0);
}

/*
 * And here's our reducer function for colors. Reducers will fire off any time
 * Redux dispatches an action. In fact, *all* reducers (not just color) will
 * execute, which is why it's important to check the action.type to see what
 * action was dispatched! Remember our shouty manager in the analogy above?
 * That's why our manager yells, because when you dispatch a Redux action, it
 * gets sent out to *all* reducers. It's the reducer's decision to pay attention
 * to (or ignore) an action.
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case actions.USER_MODIFIED_COLOR:
      /*
       * Ok, so the USER_MODIFIED_COLOR action was dispatched, which means that
       * the user clicked the + or - button for R, G, or B. If you glance
       * back at /client/actions/colors.js, you can see that the
       * USER_MODIFIED_COLOR action also has two arguments, colorName and
       * changeBy. We have access to those here, so we can decide how to modify
       * the color state. Let's do it!
       */

      if (action.colorName === 'R') {
        return {
          ...state,
          Rvalue: limitRgbVal(state.Rvalue + action.changeBy),
          errorReason: null,
        };
      } else if (action.colorName === 'G') {
        return {
          ...state,
          Gvalue: limitRgbVal(state.Gvalue + action.changeBy),
          errorReason: null,
        };
      } else if (action.colorName === 'B') {
        return {
          ...state,
          Bvalue: limitRgbVal(state.Bvalue + action.changeBy),
          errorReason: null,
        };
      }

      // We set the errorReason to `null` in order to clear out any error that
      // might have occured before since our current actions are successful
      // ones.

      // In the weird scenario you pass an invalid color value:
      return state; // return the state, unmodified

    /*
     * Yes, that code could be more efficient, but I wanted to spell it out
     * so it's very clear what's going on. What we're doing is looking at the
     * color value passed by the Redux action (R, G, or B), the value to
     * modify it by (+1 or -1 in our case), and return a new color state with
     * that color value modified. Check out this notation:
     *
     *   return {
     *     ...state,
     *     Rvalue: state.Rvalue + action.changeBy,
     *   };
     *
     * This is taking advantage of the ES6 spread operator (...). In the case
     * of objects, it's the same as using _.extend from underscore or lodash:
     *
     *   return _.extend({}, state, {Rvalue: state.Rvalue + action.changeBy});
     *
     * So "..." basically "flattens" an object out. Our return statement is
     * essentially doing this: (assuming the state is R=38, G=255, B=110)
     *
     *   return {
     *     // ...state "flattens" or expands to:
     *     Rvalue: 38,
     *     Gvalue: 255,
     *     Bvalue: 110,
     *
     *     // and then our modification
     *     Rvalue: 38 + action.changeBy
     *   };
     *
     * We couldn't just do this:
     *
     *   return {
     *     Rvalue: limitRgbVal(state.Rvalue + action.changeBy),
     *   };
     *
     * because it would wipe out Gvalue, Bvalue, and errorReason. That would
     * be equivalent to our manager shouting "just paint the statue red!" and
     * the worker painting the statue red *and* throwing the hat away.
     *
     * And I actually did not realize until writing this that if you do
     * something like this in JavaScript:
     *
     *   x = {a: 9, b: 23, c: 0, a: 50};
     *
     * The rightmost property will take precedence over any previous
     * declarations. I thought maybe x = {a: 10, a: 2} would throw an error,
     * but in fact it does not, and the value of x.a here would be 2.
     *
     * Learn more about the ES6 spread operator here:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
     */

    case actions.USER_CHOSE_COLOR:
      /*
       * User clicked a color in the left sidebar. Return the current state,
       * plus the new R, G, B values that should be set on the page background
       * and the color setter widget.
       */
      return {
        ...state,
        ...action.color,
        errorReason: null,
      };

    case actions.COLOR_SAVE_SUCCEEDED:
      // Save successful! Do nothing except clear out any error message
      return {
        ...state,
        errorReason: null,
      };

    case actions.COLOR_SAVE_FAILED:
      // Save failed, set the error in the state
      return {
        ...state,
        errorReason: action.errorReason,
      };

    default: // some other action we don't care about (like "boil the water!"),
      // leave color state alone
      return state;
  }
}

/*
 * Does your brain hurt? Hopefully not too much. Redux took me some time to
 * fully grasp. Just keep going through this code, and do your own experiments
 * as well. Hang in there, because it's worth it!
 *
 * Now go to /client/reducers/index.js.
 */
