import React, {PropTypes} from 'react';
import ColorSetterContainer from '../containers/ColorSetterContainer.jsx';

// Nothing new here that we haven't seen before!

export default Home = (props) => {
  return <div>
    <ColorSetterContainer />
  </div>
}

Home.propTypes = {}; // placeholder
Home.displayName = 'Home';

// Go take a look at /client/containers/ColorSetterContainer.jsx
