import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(MainLayout, {content: () => <Home />});
  }
});
