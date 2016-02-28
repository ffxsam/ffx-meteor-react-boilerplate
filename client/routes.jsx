/*
 * Welcome to the example app!
 *
 * I'll assume you have very little Meteor knowledge, but you should have a
 * pretty firm grasp on JavaScript. Things will likely be over-explained, but
 * IMO, this is better than under-explaining and leaving people confused who are
 * trying to learn something new.
 *
 * Comments will be sprinkled liberally throughout. You should be able to
 * follow them to lead you through the code in a way that makes sense.
 *
 * If you have any questions, please open a new issue on GitHub:
 * https://github.com/ffxsam/ffx-meteor-react-boilerplate/issues
 */

// Meteor 1.3 introduces ES6 module support, so we get to use import/export!
// http://exploringjs.com/es6/ch_modules.html
import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';

injectTapEventPlugin(); // like FastClick

/*
 * At its most basic usage, FlowRouter simply specifies a path and an action
 * to take when the user hits that URL. "name" is optional, but it comes in
 * handy when you want to programatically refer to this route - e.g.
 * FlowRouter.go('home').
 */
FlowRouter.route('/', {
  name: 'home',
  action() {
    /*
     * This says to render the MainLayout component and pass a prop called
     * "content" whose value is the Home component.
     */
    mount(MainLayout, {content: () => <Home />});
  }
});

/*
 * If you're not familiar with the () => notation above, this article should
 * help:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 *
 * In short:
 *
 * (param1, param2) => this.doSomething()
 *
 * is the same as:
 *
 * function (param1, param2) {
 *   return this.doSomething()
 * }.bind(this)
 */

// Now go look at /client/layouts/MainLayout.jsx.
