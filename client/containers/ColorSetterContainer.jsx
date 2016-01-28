import React, {PropTypes} from 'react';
import {ReactMeteorData} from 'meteor/react-meteor-data';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {_i18n as i18n} from 'meteor/universe:i18n';
import AppState from '../appstate/state';
import ColorSetter from '../components/ColorSetter.jsx';
import actions from '../appstate/actions';

/*
 * We're defining styles a bit differently than you might be used to (in a
 * CSS, LESS, or SCSS file). These are JavaScript inline styles, and honestly
 * @chantastic does a good job demonstrating their use case:
 * https://www.youtube.com/watch?v=ERB1TJBn32c#t=26m18s
 *
 * With some styles, it makes more sense to place them in CSS files (styles
 * that need to cascade, pseudo-elements and pseudo-classes, etc). Styles you
 * want to be able to quickly/easily change or styles that make sense being
 * tightly coupled to your component should probably be inline.
 */

/*
 * let vs const:
 * I tend to use const on any object that I know I'll never modify directly
 * after it's been declared. It prevents me from making mistakes. On objects
 * and variables that might change after their declaration, use let.
 */
const styles = {
  colorContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'background-color .3s ease-in-out' // make it smooooooth
  },
  box: {
    backgroundColor: '#f0f0f0',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)',
    padding: '2em'
  }
};

/*
 * Now we're actually going to use a true React component as opposed to a
 * stateless component. This type of component can contain the full lifecycle
 * of React methods (componentDidMount, componentWillUnmount, etc), mixins,
 * and propTypes can be defined inside the class. It can also contain custom
 * methods that you define to take certain actions. More on that below.
 *
 * Also of utmost importance to note: this is a container. A container component
 * is one that is aware of (and manages) state, data, and actions. Think of it
 * as a parent controller that tells children ("dumb," stateless components)
 * what to render.
 *
 * You can see more about containers here: https://youtu.be/KYzlpRvWZ6c?t=22m49s
 */
export default ColorSetterContainer = React.createClass({
  /*
   * A mixin is a sort of "include." It's very similar to Sass mixins. So
   * in this particular case, if you were to look at the source code for the
   * ReactMeteorData mixin, it's just an object that contains typical React
   * lifecycle methods (componentDidMount etc). Including the mixin here will
   * ensure that ReactMeteorData's lifecycle methods are executed alongside
   * the ones defined below.
   *
   * For more on React lifecycle methods, see:
   * https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
   */
  mixins: [ReactMeteorData, PureRenderMixin],
  // Read more about PureRenderMixin here:
  // https://facebook.github.io/react/docs/pure-render-mixin.html

  /*
   * getMeteorData() is a special method defined in the ReactMeteorData mixin.
   * It's where Mongo collections and any other reactive data sources should be
   * referenced if you want your React component itself to be reactive and
   * re-render when any reactive source changes.
   *
   * For example, if you were to reference something like a Mongo collection
   * or ReactiveDict inside the render() method below, that data would be
   * retrieved and used any time the component renders, but if the ReactiveDict
   * were to change, it would *not* cause a re-render.
   *
   * Just remember: all reactive data goes inside getMeteorData(), and this is
   * where subscriptions should be placed as well.
   */
  getMeteorData() {
    // Subscribe to the "colors" publication in /server/publications.js
    const handle = Meteor.subscribe('colors');

    /*
     * Properties returned by this method are accessed elsewhere in the
     * component via this.data.<propertyName>.
     */
    return {
      ready: handle.ready(),
      color: AppState.get('color'),
      savedColors: Colors.find({}, {sort: {createdAt: 1}}).fetch()
    }
  },

  /*
   * colorChange() and saveCurrentColor() are my own methods I've created.
   * React's lifecycle methods can access these via this.colorChange and
   * this.saveCurrentColor. We'll cover the "actions" bit later, so don't
   * worry about that right now.
   */
  colorChange(colorName, value) {
    actions.changeColorBy(colorName, value);
  },

  saveCurrentColor() {
    // Call a Meteor method on the server called saveColor; more later on that
    Meteor.call('saveColor', this.data.color, (error, result) => {
      if (error) {
        alert('Something went horrifically wrong.');
      }
    });
  },

  /*
   * render() is the the lifecycle method in charge of (drumroll..) rendering
   * output to the DOM.
   */
  render() {
    /*
     * This format below is called destructuring.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
     *
     * Remember, this.data.color is coming from AppState.get('color') returned
     * from getMeteorData() above. When AppState.set('color', ...) is called,
     * it will in turn cause getMeteorData() to fire, which will cause render()
     * to fire as well.
     */
    const {R, G, B} = this.data.color;

    /*
     * Must check for this.refs.container, because as we're rendering, there's
     * a brief point in time where it actually doesn't exist.
     */
    if (this.refs.container) {
      /*
       * Template strings in ES6 rock! Learn more:
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings
       */
      this.refs.container.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    }

    /*
     * "ref" is a special attribute you can put in JSX tags so your React
     * component can reference them elsewhere. In regular HTML/JS, you might
     * use document.querySelector, or jQuery selectors to locate DOM elements.
     */
    return <div ref="container" style={styles.colorContainer}>
      {/*
        * Render the ColorList component and pass a prop "colors" which is
        * this.data.savedColors, containing the results of the Colors.find()
        * from above in getMeteorData().
        */}
      <ColorList colors={this.data.savedColors} />

      <div style={styles.box}>
        {/*
         * Here we're finally passing a callback function into a prop
         * (onValueChange={this.colorChange}). The name of the prop doesn't
         * really matter, though you should consider choosing a convention that
         * works for you and stick to it for consistency's sake. We're passing
         * the colorChange() method into it, so that ColorSetter has access
         * to that method and can make calls to it.
         */}
        <ColorSetter colorName="R" value={R} onValueChange={this.colorChange} />
        <ColorSetter colorName="G" value={G} onValueChange={this.colorChange} />
        <ColorSetter colorName="B" value={B} onValueChange={this.colorChange} />

        <div style={{paddingTop: '2em', textAlign: 'center'}}>
          <button onClick={this.saveCurrentColor}>
            {i18n.__('setter.saveButton')}
          </button>
        </div>
      </div>
    </div>
  }
})

// Let's take a detour and head over to /client/appstate/actions.js
