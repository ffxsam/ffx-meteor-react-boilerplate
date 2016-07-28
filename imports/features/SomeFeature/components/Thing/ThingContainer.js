import { createContainer } from 'meteor/react-meteor-data';
// import { connect } from 'react-redux';

import Thing from './Thing';
export default createContainer(() => {
  return {
    meteorData: 'goes here',
  }
}, Thing)
