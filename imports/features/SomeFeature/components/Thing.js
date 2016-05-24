import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import autoBind from 'react-autobind';

const styles = {
  root: {
    border: '1px dotted black',
    display: 'inline',
    padding: 10,
  },
};

class Thing extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  showProps() {
    console.log(this.props);
  }

  render() {
    return <div style={styles.root}>
      <button onClick={this.showProps}>Dump props</button>
    </div>
  }
}

Thing.propTypes = {};

export default Radium(Thing)
