import React, { PropTypes } from 'react';
// import { Provider } from 'react-redux';
// import store from '/imports/redux/store';

const MainLayout = ({ content }) => {
  // return <Provider store={store}>
  //   {content()}
  // </Provider>
  return <div>
    {content()}
  </div>
};

MainLayout.propTypes = {
  content: PropTypes.func.isRequired,
};

export default MainLayout
