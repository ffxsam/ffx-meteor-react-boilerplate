/*
 * The actions folder is a good place define Redux actions, and I'll group
 * them logically into separate files. Actions consist of a few parts:
 *
 * - A string constant which is the name of the action
 * - A function (called an "action creator") which simply returns an object
 *   consisting of the action type (the constant we just mentioned), plus any
 *   arguments the action should take.
 *
 * Seems a bit weird. What's the point of making an "action" that just returns
 * its own name and maybe some arguments? Good question, but this isn't the
 * place to answer it. Take a quick glance at the code below...
 */

import {saveColor} from '/lib/methods';

export const USER_MODIFIED_COLOR = 'USER_MODIFIED_COLOR';
export function userModifiedColor(colorName, changeBy) {
  /*
   * Note that you *could* perform some action right here before the return
   * statement, just not an asynchronous function that might take time. That's
   * what thunks are for (there's one below this action creator).
   */
  return {
    type: USER_MODIFIED_COLOR, // yes, dangling commas are cool now
    colorName, // remember, in ES6, this is equivalent to colorName: colorName
    changeBy,
  }
}

export const USER_SAVED_COLOR = 'USER_SAVED_COLOR';
export function userSavedColor(color) {
  /*
   * This is a thunk! A thunk is a special kind of action creator that actually
   * returns a function. The purpose of this is so that this action can run
   * asynchronous operations as well as dispatch other actions (to announce
   * success or failure, for example).
   *
   * In a thunk, you return a function which accepts the dispatch function (to
   * dispatch other actions) and getState which is a function that allows you
   * to access the Redux state if you need it.
   */
  return (dispatch, getState) => {
    // Call our Meteor method
    saveColor.call(color, (error, result) => {
      if (error) {
        // Did we fail? If so, dispatch a Redux action
        dispatch(colorSaveFailed(error.reason));
      } else {
        // ..or we succeeded!
        dispatch(colorSaveSucceeded());
      }
    });
  }
}

/*
 * Action creator for when we successfully saved a color to the database
 */
export const COLOR_SAVE_SUCCEEDED = 'COLOR_SAVE_SUCCEEDED';
export function colorSaveSucceeded() {
  return {
    type: COLOR_SAVE_SUCCEEDED,
    // No data to process here, just tell the world of our success
  }
}

/*
 * Action creator for when we failed to save a color
 */
export const COLOR_SAVE_FAILED = 'COLOR_SAVE_FAILED';
export function colorSaveFailed(errorReason) {
  return {
    type: COLOR_SAVE_FAILED,
    errorReason,
  }
}

export const USER_CHOSE_COLOR = 'USER_CHOSE_COLOR';
export function userChoseColor(color) {
  return {
    type: USER_CHOSE_COLOR,
    color,
  }
}

// Head over to /client/reducers/colors.js and all will be explained
