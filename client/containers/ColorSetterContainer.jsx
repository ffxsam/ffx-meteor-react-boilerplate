import React, {PropTypes} from 'react';
import {ReactMeteorData} from 'meteor/react-meteor-data';
import AppState from '../appstate/state';
import ColorSetter from '../components/ColorSetter.jsx';
import actions from '../appstate/actions';

const styles = {
  colorContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'background-color .3s ease-in-out' // make it smooooooth
  },
  box: {
    backgroundColor: '#f0f0f0',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)',
    padding: '2em'
  }
};

export default ColorSetterContainer = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      colors: AppState.get('colors')
    }
  },

  colorChange(colorName, value) {
    actions.changeColorBy(colorName, value);
  },

  render() {
    const {R, G, B} = this.data.colors;

    if (this.refs.container) {
      this.refs.container.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    }

    return <div ref="container" style={styles.colorContainer}>
      <div style={styles.box}>
        <ColorSetter colorName="R" value={R} onValueChange={this.colorChange} />
        <ColorSetter colorName="G" value={G} onValueChange={this.colorChange} />
        <ColorSetter colorName="B" value={B} onValueChange={this.colorChange} />
      </div>
    </div>
  }
})
