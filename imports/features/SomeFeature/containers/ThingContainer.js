import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import Thing from '../components/Thing';
export default connect()(createContainer(_ => {
  return {
    meteorData: 'goes here',
  }
}, Thing))
