import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(MainLayout, { content: () => <Home /> });
  },
});
