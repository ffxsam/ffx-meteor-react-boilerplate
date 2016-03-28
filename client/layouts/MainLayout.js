import React, { PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import store from '../store';

injectTapEventPlugin();

export default MainLayout = ({ content }) => {
  return <Provider store={store}>
    {content()}
  </Provider>
}

MainLayout.propTypes = {
  content: PropTypes.func.isRequired
};
