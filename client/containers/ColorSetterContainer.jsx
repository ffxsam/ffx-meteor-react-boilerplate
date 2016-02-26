import React, {Component, PropTypes} from 'react';
import {ReactMeteorData} from 'meteor/react-meteor-data';
import {_i18n as i18n} from 'meteor/universe:i18n';
import reactMixin from 'react-mixin';
import {connect} from 'react-redux';
import _ from 'lodash';

import ColorSetter from '../components/ColorSetter.jsx';
import {
  userModifiedColor,
  userSavedColor,
  userChoseColor,
} from '../actions/colors';

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
 * This is a "container" component, which is a component that is aware of (and
 * manages) state, data, and actions. Think of it as a parent controller that
 * tells children ("dumb," stateless components) what to render.
 *
 * You can see more about containers here: https://youtu.be/KYzlpRvWZ6c?t=22m49s
 */

class ColorSetterContainer extends Component {
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
      savedColors: Colors.find({}, {sort: {createdAt: 1}}).fetch(),
    }
  }

  /*
   * This lifecycle method will fire off when new props are sent to this
   * component.
   */
  componentWillReceiveProps(nextProps) {
    /*
     * Back to our wooden statue analogy. This is where things will actually
     * happen in the UI. Remember that our worker (reducer) is only concerned
     * about the state of the statue. It's this container component's job to
     * react to that and visually do something.
     *
     * So the worker paints the statue yellow, and you walk up to the worker and
     * say, "The king hates the color yellow, you'd better put up a curtain
     * around your work area so he doesn't see it." The worker would just reply,
     * "Hey, I don't do that. I'm just in charge of changing how this thing
     * looks."
     *
     * Being an adept engineer, you build a machine that that gazes at the
     * statue constantly, and whenever the statue is yellow, your machine lowers
     * a curtain over the statue so the king doesn't see it and decide to
     * start beheading people!
     *
     * ColorSetterContainer is that machine. It's aware of the entire Redux
     * state, and will re-render when the props passed to it (via the connect
     * function) change. If you need to perform some sort of business logic when
     * the Redux state changes (render is not the place for that), you can do so
     * in componentWillReceiveProps.
     */
    if (nextProps.errorReason) {
      alert('Error! ' + JSON.stringify(nextProps.errorReason, null, 2));
    }
  }

  /*
   * colorChange() and saveCurrentColor() are my own methods I've created.
   * React's lifecycle methods can access these via this.colorChange and
   * this.saveCurrentColor.
   */
  colorChange(colorName, changeBy) {
    /*
     * Redux's connect function (bottom of this file) gives us the dispatch prop
     * so we can dispatch actions. Time to use it! Remember that
     * userModifiedColor is an action creator, and simply returns an object that
     * looks like this:
     *
     *   {
     *     type: USER_MODIFIED_COLOR,
     *     colorName: colorName,
     *     changeBy: changeBy,
     *   }
     */
    this.props.dispatch(userModifiedColor(colorName, changeBy));
  }

  saveCurrentColor() {
    // Dispatch the USER_SAVED_COLOR action, and pass the color object
    this.props.dispatch(userSavedColor(this.props.color));
  }

  saveInvalidColor() {
    // Intentionally try to save an invalid color value
    this.props.dispatch(userSavedColor({Rvalue: 100, Gvalue: 0, Bvalue: 300}));
  }

  chooseColor(color) {
    // User clicked a color on the left sidebar
    this.props.dispatch(userChoseColor(color));
  }

  /*
   * render() is the the lifecycle method in charge of (drumroll..) rendering
   * output to the DOM.
   */
  render() {
    /*
     * This format below is called destructuring.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
     *
     * this.props.color (below) is a prop being passed in by the Redux connect
     * function which you can find at the bottom of this file.
     */
    const {Rvalue, Gvalue, Bvalue} = this.props.color;
    const containerStyle = {
      ...styles.colorContainer,
      backgroundColor: `rgb(${Rvalue}, ${Gvalue}, ${Bvalue})`,
    };

    return <div style={containerStyle}>
      {/*
       * Render the ColorList component and pass a prop "colors" which is
       * this.data.savedColors, containing the results of the Colors.find()
       * from above in getMeteorData().
       */}
      <ColorList
        colors={this.data.savedColors}
        onChooseColor={this.chooseColor.bind(this)}
      />

      <div style={styles.box}>
        {/*
         * Here we're finally passing a callback function into a prop
         * (onValueChange={this.colorChange}). The name of the prop doesn't
         * really matter, though you should consider choosing a convention that
         * works for you and stick to it for consistency's sake. We're passing
         * the colorChange() method into it, so that ColorSetter has access
         * to that method and can make calls to it.
         */}
        <ColorSetter
          colorName="R"
          value={Rvalue}
          onValueChange={this.colorChange.bind(this)}
        />
        <ColorSetter
          colorName="G"
          value={Gvalue}
          onValueChange={this.colorChange.bind(this)}
        />
        <ColorSetter
          colorName="B"
          value={Bvalue}
          onValueChange={this.colorChange.bind(this)}
        />

        <div style={{paddingTop: '2em', textAlign: 'center'}}>
          <button onClick={this.saveCurrentColor.bind(this) /* see below */}>
            {i18n.__('setter.saveButton')}
          </button>

          <button onClick={this.saveInvalidColor.bind(this)}>
            {i18n.__('setter.badButton')}
          </button>
        </div>
      </div>
    </div>
  }
}

/*
 * What's up with the onClick event above? Why not just:
 *
 * <button onClick={this.saveCurrentColor}>
 *
 * Since we're using ES6 classes, the 'this' object will only refer to
 * ColorSetterContainer within React's lifecycle methods. Custom methods you
 * create will not have access to the React component unless you set the context
 * with JavaScript's bind method.
 */

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
reactMixin(ColorSetterContainer.prototype, ReactMeteorData);

/*
 * More Redux stuff. So, our ColorSetterContainer needs to be aware of the Redux
 * store so it can access state, and dispatch actions. That's done by mapping
 * the Redux state to props, that we send into ColorSetterContainer. Here's how:
 */

function mapStateToProps({colors}) {
  /*
   * Once again note the destructuring above. It's the same as just grabbing
   * the colors property off the state object which is mapStateToProps' first
   * parameter.
   */
  return {
    /*
     * This state argument is the entire app's state, so we have to be sure to
     * just reference the reducer that we're interested in. In this case, it's
     * colors.
     */
    color: _.omit(colors, 'errorReason'), // we want the error separate
    errorReason: colors.errorReason,

    /*
     * Remember this, from /client/reducers/colors.js?
     *
     * const initialState = {
     *   Rvalue: 255,
     *   Gvalue: 255,
     *   Bvalue: 255,
     *   errorReason: null,
     * };
     *
     * Just to drive this point home: with mapStateToProps, we're accessing
     * this state (state.colors) and mapping it to a set of props that will be
     * passed into ColorSetterContainer. If we had another reducer, say
     * /client/reducers/accounts.js, we could've easily accessed that here too:
     *
     * function mapStateToProps({colors, accounts}) { ... }
     */
  }
}

export default connect(mapStateToProps)(ColorSetterContainer)
/*
 * And now thanks to connect, we've just passed the color and errorReason props
 * above into ColorSetterContainer. Essentially we now have:
 *
 *   <ColorSetterContainer
 *     color={_.omit(state.colors, 'errorReason')}
 *     errorReason={state.colors.errorReason}
 *     ...otherProps
 *   />
 *
 * connect also passes in a dispatch prop so the component can dispatch Redux
 * actions. So actually, we've done:
 *
 *   <ColorSetterContainer
 *     color={_.omit(state.colors, 'errorReason')}
 *     errorReason={state.colors.errorReason}
 *     dispatch={store.dispatch}
 *     ...otherProps
 *   />
 */

/*
 * A quick recap of Redux:
 *
 * Dispatch an action (which may/may not have side effects)
 *        |
 *        |
 *        V
 * All reducers hear it
 *        |
 *        |
 *        V
 * A single reducer chooses to react to this action
 * Reducer returns a new state
 *        |
 *        |
 *        V
 * Any React components that are listening to that particular part of the state
 * via mapStateToProps/connect will know about the new state and will receive
 * that via props
 */

// Now open up /client/components/ColorList.jsx
