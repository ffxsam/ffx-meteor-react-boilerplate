import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';

import store from '../store';

/*
 * This is a stateless function or stateless component. It's a type of React
 * component (though technically just a function) whose only job is to render
 * output. It isn't aware of any state, it doesn't perform any logic.
 * See https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
 *
 * Technically the name MainLayout isn't needed here since it's an export
 * default, but I include it so WebStorm can trace back to it when I cmd-click
 * on any references to MainLayout. Plus, code clarity.
 */

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

  /*
   * Since we're using Redux, we have to wrap our content in <Provider />
   * to make the Redux store available to it. More on that later though.
   */
  return <Provider store={store}>
    {/* Now this is JSX. All JavaScript must be wrapped in { }!
      *
      * Remember we passed the "content" prop as a function, so we have to
      * call it. So if we had passed a React component <UserAccount />, it would
      * render that component out below.
      *
      * If you're familiar with Blaze, this is similar to {{> yield}}
      */}
    {content()}
  </Provider>
}

/*
 * PropTypes allows you to specify what prop names (and their respective types)
 * should be passed into this component.
 * See https://facebook.github.io/react/docs/reusable-components.html#prop-validation
 */
MainLayout.propTypes = {
  content: PropTypes.func.isRequired
};

// Now head over to /client/pages/Home.jsx since that's what's being displayed
// first
