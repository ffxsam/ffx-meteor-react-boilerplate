import { Meteor } from 'meteor/meteor';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Thing from './Thing';

describe('<Thing />', function () {
  if (Meteor.isServer) return;

  it('is magic', function () {
    const wrapper = shallow(<Thing />);
  });
});
