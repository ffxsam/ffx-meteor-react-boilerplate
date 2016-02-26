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

/*
 * This is the component that shows either R, G, or B, and has a +/- button
 * below it to let you modify the R/G/B value. This component is contained by
 * ColorSetterContainer which handles all data and state awareness,
 * so we'll keep ColorSetter "dumb" and make it a stateless component.
 */

/*
 * More shorthand below! We have a couple choices when it comes to stateless
 * components:
 *
 * MyComponent = () => {
 *   return <div>...</div>
 * }
 *
 * MyComponent = () => (
 *   <div>...</div>
 * )
 *
 * The only difference of course is that with the first option, you have some
 * room above the 'return' statement to place JavaScript code. In the second
 * option, we're inside a 'return' statement already and can only put JSX
 * there (which can contain JavaScript in curly braces { }).
 */
export default ColorSetter = ({colorName, value, onValueChange}) => (
  /*
   * colorName === either 'R', 'G', or 'B'. We're also being passed a value from
   * 0 to 255, but we're not actually changing it in this component, we're only
   * displaying it. The container will be in charge of that.
   */
  <div style={styles.colorSetter}>
    <div style={styles.colorName}>{colorName}</div>
    <div>
      {/*
       * Remember in ColorSetterContainer, we referenced ColorSetter like this:
       * <ColorSetter colorName="R" value={R} onValueChange={this.colorChange} />
       *
       * So ColorSetter's onValueChange prop contains its parent's
       * (ColorSetterContainer) function called colorChange. When the user
       * clicks either the + or - button below, it will effectively call the
       * function passed to us from the container, and give it the colorName
       * (R, G, or B) and how much to increase/decrease the value by.
       */
      }
      <button onClick={() => onValueChange(colorName, 10)}>+</button>
      <button onClick={() => onValueChange(colorName, -10)}>-</button>
    </div>
    <div style={styles.colorValue}>
      {value} {/* the current value of R, G, or B */}
    </div>
  </div>
) // no semicolon needed for export default

ColorSetter.propTypes = {
  colorName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired
};

/*
 * At this point, we're gone through the layout, home page, ColorSetterContainer
 * and its children. We've also covered Redux. Let's take a look at the
 * Colors collection that stores the color swatches that we save.
 * Open up /lib/collections/colors.js
 */
