import React, {PropTypes} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

/*
 * This is a stateless function or stateless component. It's a type of React
 * component (though technically just a function) whose only job is to render
 * output. It isn't aware of any state, it doesn't perform any logic.
 * See https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
 *
 * Technically the name MainLayout isn't needed here since it's an export
 * default, but I include it for clarity's sake, and so WebStorm can trace back
 * to it when I
 */

injectTapEventPlugin(); // like FastClick

export default MainLayout = ({content}) => {
  /*
   * The above {syntax} is called destructuring, it's a JavaScript ES6 feature.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
   *
   * It's shorthand for this:
   *
   * something = (props) {
   *   const content = props.content;
   * }
   */

  // We're still working in JavaScript at this point, by the way...

  return <div>
    {/* Now this is JSX. All JavaScript must be wrapped in { }!
      *
      * Remember we passed the "content" prop as a function, so we have to
      * call it. So if we had passed a React component <UserAccount />, it would
      * render that component out below.
      *
      * If you're familiar with Blaze, this is similar to {{> yield}}
      */}
    {content()}
  </div>
}

/*
 * PropTypes allows you to specify what prop names (and their respective types)
 * should be passed into this component.
 * See https://facebook.github.io/react/docs/reusable-components.html#prop-validation
 */
MainLayout.propTypes = {
  content: PropTypes.func.isRequired
};

/*
 * This is not necessary unless you're using the React DevTools browser
 * extension. If you don't specify a displayName on a stateless component,
 * it will show up as "StatelessComponent" in the tree, which can make it
 * difficult to debug your application.
 * https://github.com/facebook/react-devtools (HIGHLY recommended!)
 */
MainLayout.displayName = 'MainLayout';

// Now head over to /client/pages/Home.jsx since that's what's being displayed
// first
