import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import prebind from 'meteor-react-prebind';

import { someAction } from '/imports/redux/actions';

class Thing extends Component {
  constructor(props) {
    super(props);
    prebind(this);
  }

  showProps() {
    console.log(this.props);
  }

  render() {
    return <div style={styles.root}>
      <button style={styles.button} onClick={this.showProps}>Dump props</button>
    </div>
  }
}

const styles = {
  root: {
    display: 'inline',
  },
  button: {
    background: '#eee',
    border: '1px solid #ddd',
    fontSize: 24,
  },
};

Thing.propTypes = {};

export default Radium(Thing)
