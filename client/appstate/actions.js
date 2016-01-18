import AppState from './state';

export default {
  changeColorBy(colorName, value) {
    let colors = AppState.get('colors');

    colors[colorName] = Math.max(
      Math.min(colors[colorName] + value, 255),
      0);
    AppState.set('colors', colors);
  }
}
