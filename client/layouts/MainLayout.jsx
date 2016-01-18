import React, {PropTypes} from 'react';

export default MainLayout = ({content}) => {
  return <div>
    {content()}
  </div>
}

MainLayout.propTypes = {};
MainLayout.displayName = 'MainLayout';
