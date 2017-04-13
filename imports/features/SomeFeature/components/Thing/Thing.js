import React, { Component } from 'react';
import Radium from 'radium';

@Radium class Thing extends Component {
  callMethod = async () => {
    try {
      const result = await this.props.someMethod({ name: 'Unknown' });
      console.log(result);
    } catch (e) {
      console.error('error!', e);
    }
  };

  showProps = () => {
    console.log(this.props);
  };

  render() {
    return (
      <div style={styles.root}>
        <div>
          <button style={styles.button} onClick={this.showProps}>
            Dump props
          </button>
        </div>
        <div>
          <button style={styles.button} onClick={this.callMethod}>
            Call Meteor method
          </button>
        </div>
      </div>
    );
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

export default Thing;
