import React, { Component } from 'react';
import Radium from 'radium';

class Thing extends Component {
  showProps = () => {
    console.log(this.props);
  };

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
