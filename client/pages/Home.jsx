import React, {PropTypes} from 'react';
import ColorSetterContainer from '../containers/ColorSetterContainer.jsx';

/*
 * In case you're wondering about this pages folder, I like to have the
 * following structure for my apps:
 *
 * /client/components/
 * /client/containers/
 * /client/layouts/
 * /client/pages/
 *
 * Layouts wrap everything else. Pages are React components that the router
 * renders. Containers are data-aware components that pass props down to their
 * children, and components are just plain components mostly charged with just
 * rendering content (no business logic).
 */

export default Home = (props) => {
  return <div>
    <ColorSetterContainer />
  </div>
}

Home.propTypes = {}; // placeholder

// Go take a look at /client/store.js
