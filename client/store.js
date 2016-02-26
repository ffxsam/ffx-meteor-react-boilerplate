/*
 * Feb 26, 2016:
 * Ok, I've decided to implement Redux into the example app! The app state used
 * to just be managed by a ReactiveDict, but after some thought and using Redux
 * in some real-world projects, I decided to pull the trigger.
 *
 * Redux, in my opinion, may not be easy to grasp for everyone. It took me a few
 * times trying to understand and use it before it clicked, so I'll do my best
 * to explain the flow of Redux and how it works.
 *
 * With Redux, you have a single store object (compare with Flux's multiple
 * stores) that maintains different parts of your app's state. It can maintain
 * anything you want, so you might break it into these states:
 *
 * store.layout (to keep track of slide-out sidebars, theme, other UI stuff)
 * store.colors (in the case of this app, keep track of color choice as the user
 *               is creating it)
 *
 * Redux isn't just about keeping track of your app state, either. It will also
 * act as an action dispatcher. So as many actions as you can think of in your
 * application (user clicked a button to delete something, user opened a
 * sidebar, etc), Redux will most likely handle those. More on this later.
 *
 * This store.js file is where the Redux store is created. Our React containers
 * will connect to the store in order to access state objects and dispatch
 * actions. To keep things neat and clean, *only* React containers will connect
 * to the store. Stateless functions/components will never talk to Redux
 * directly.
 */

import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

/*
 * Think of middleware as add-ons for Redux, because that's all they are. It's
 * called middleware because these add-ons are executed in between the action
 * dispatch and the reducer stage (which we'll cover in a bit). You also might
 * be wondering what the heck the "thunk" middleware is. We'll get to that too!
 */
const middleware = [thunk];
let devtools;

if (process.env.NODE_ENV === 'development') {
  // Add any middleware for dev environment only
  /*
   * I HIGHLY recommend this Chrome extension for Redux debugging:
   * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
   *
   * It will allow you to easily see all actions dispatched, how they affect the
   * state, and you can even undo state changes with a click. Get it now!
   */
  if (window.devToolsExtension) {
    devtools = window.devToolsExtension();
  } else {
    /*
     * But if you don't have the extension or aren't using Chrome, we'll still
     * use the logger which dumps actions and state changes to the browser
     * console.
     *
     * You can also use a browser version of the Redux DevTools as well:
     * https://github.com/gaearon/redux-devtools
     */
    middleware.push(logger());
    devtools = f => f;
  }
} else {
  // This is basically the same as saying "nothing," since we can't pass null
  // to compose()
  devtools = f => f;
}

/*
 * This step actually creates our store, building it from the reducers and any
 * store enhancers such as our middleware. I won't get into the details of this
 * step since it can be a bit tricky to understand. Just consider it
 * boilerplate, and know that if you want to add more middleware, do it above
 * by adding them to the middleware array.
 */
export default createStore(
  reducers,
  compose(
    applyMiddleware(...middleware),
    devtools
  )
)
/*
 * And then we're exporting the store, which, if you recall, is used in
 * /client/layouts/MainLayout.jsx so it can be sent down to any components that
 * need to reference the store.
 */

/*
 * Now go to /client/actions/colors.js and we'll cover actions. We'll cover
 * reducers right after that!
 */
