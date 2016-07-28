import React, { Component } from 'react';
import Radium from 'radium';

class Thing extends Component {
  callMethod = () => {
    this.props.someMethod({ name: 'Unknown' }, (error, result) => {
      console.log(result);
    });
  };

  showProps = () => {
    console.log(this.props);
  };

  render() {
    return <div style={styles.root}>
      <div>
        <button
          style={styles.button}
          onClick={this.showProps}>
          Dump props
        </button>
      </div>
      <div>
        <button
          style={styles.button}
          onClick={this.callMethod}
        >
          Call Meteor method
        </button>
      </div>
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
