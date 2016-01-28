import {ReactiveDict} from 'meteor/reactive-dict';

/*
 * As mentioned before, AppState contains/manages general application state. If
 * you've heard of Flux, Redux, or any of their cousins, you might be wondering
 * why I haven't used any of those in this project. While it would be perfectly
 * acceptable to use a Flux-like system, Meteor has enough viable options with
 * ReactiveDict and client-only Mongo collections[1] that you don't really need
 * Flux/Redux.
 *
 * [1] TemporaryStuff = new Mongo.Collection(null); //client-only
 */

/*
 * A ReactiveDict is a dictionary object that's also reactive. When values
 * inside of it change, any .get() calls within Tracker.autorun or any other
 * reactive methods (such as getMeteorData) will cause that method to fire.
 */
const AppState = new ReactiveDict('appState'); // Name it whatever you like

// Initialize defaults
AppState.set({
  color: {R: 255, G: 255, B: 255}
});

/*
 * Be careful about how you set ReactiveDicts, it's easy to destroy data.
 * For example, if you wanted to just change the blue (B) color, you'd do this:
 *
 * AppState.set('color', Object.assign({}, AppState.get('color'), {B: 42}));
 *
 * Another way of writing this if you were to use underscore.js is:
 *
 * AppState.set('color', _.extend(AppState.get('color'), {B: 42}));
 *
 * If you had done this:
 *
 * AppState.set('color.B', 42);
 *
 * it would've created a new variable in the dictionary called "color.B." And
 * if you had tried this:
 *
 * AppState.set({color: {B: 42}});
 *
 * it would've destroyed the "color" variable, leaving it defined thusly:
 *   color: {B: 42}  // R and G are gone
 *
 * This is where something like Redux might be more useful. Or you could give
 * the meteorflux:meteorflux package a try. Either of those might be better
 * suited for a more complex app. I'd recommend meteorflux:meteorflux since it
 * was built to work specifically with Meteor.
 */

export default AppState

// Now to get back to our color components, open up /client/components/ColorList.jsx
