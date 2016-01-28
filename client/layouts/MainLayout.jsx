import React, {PropTypes} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default MainLayout = ({content}) => {
  return <div>
    {content()}
  </div>
}

MainLayout.propTypes = {
  content: PropTypes.func.isRequired
};
MainLayout.displayName = 'MainLayout';
