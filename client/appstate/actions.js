import AppState from './state';

/*
 * Just to keep things neat and clean, any changes to the AppState (a
 * ReactiveDict) will be carried out by actions here. These actions are
 * collectively imported in other files and executed as action.<actionName>.
 *
 * I'll use AppState to track general application state stuff, such as current
 * language (as in, localization), theme settings, etc.
 */

export default {
  changeColorBy(colorName, value) {
    let color = AppState.get('color');

    color[colorName] = Math.max(
      Math.min(color[colorName] + value, 255),
      0);
    AppState.set('color', color);
  },

  setColor(color) {
    AppState.set('color', color);
  }
}

// Let's jump into /client/appstate/state.js real quick.
