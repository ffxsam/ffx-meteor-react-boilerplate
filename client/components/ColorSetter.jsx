import React, {PropTypes} from 'react';

const styles = {
  colorSetter: {
    display: 'inline-block',
    margin: '0 1em'
  },
  colorName: {
    fontSize: '4em'
  },
  colorValue: {
    textAlign: 'center'
  }
};

export default ColorSetter = ({colorName, value, onValueChange}) => (
  <div style={styles.colorSetter}>
    <div style={styles.colorName}>{colorName}</div>
    <div>
      <button onClick={() => onValueChange(colorName, 10)}>+</button>
      <button onClick={() => onValueChange(colorName, -10)}>-</button>
    </div>
    <div style={styles.colorValue}>
      {value}
    </div>
  </div>
)

ColorSetter.propTypes = {
  colorName: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onValueChange: PropTypes.func.isRequired
};
ColorSetter.displayName = 'ColorSetter';
