import { createContainer } from 'meteor/react-meteor-data';
import { someMethod } from '../../methods';
import { promisifyMethod } from '/imports/helpers';

import Thing from './Thing';
export default createContainer(
  () => {
    return {
      meteorData: 'goes here',
      someMethod: promisifyMethod(someMethod),
    };
  },
  Thing,
);
