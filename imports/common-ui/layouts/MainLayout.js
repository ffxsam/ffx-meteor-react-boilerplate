import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import store from '/imports/redux/store';

export default MainLayout = ({ content }) => {
  return <Provider store={store}>
    {content()}
  </Provider>
}

MainLayout.propTypes = {
  content: PropTypes.func.isRequired,
};
