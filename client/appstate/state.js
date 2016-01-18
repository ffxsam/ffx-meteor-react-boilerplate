import {ReactiveDict} from 'meteor/reactive-dict';

const AppState = new ReactiveDict('appState');

// Initialize defaults
AppState.set({
  colors: {R: 255, G: 255, B: 255}
});

export default AppState
