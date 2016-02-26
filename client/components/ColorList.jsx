import React, {PropTypes} from 'react';
import {_i18n as i18n} from 'meteor/universe:i18n';

const styles = {
  colorList: {
    backgroundColor: '#f0f0f0',
    bottom: 0,
    left: 0,
    overflowY: 'scroll',
    padding: '1.4em',
    position: 'absolute',
    top: 0,

    /*
     * Use momentum scrolling in iOS. In pure CSS, this property is called
     * -webkit-overflow-scrolling.
     */
    WebkitOverflowScrolling: 'touch',
    width: '200px'
  }
};

/*
 * Below you'll notice the use of a function i18n.__(). This is using the
 * Meteor package universe:i18n for internationalization (whew, now you see
 * why they call it i18n!). I consider it good practice to use i18n even if
 * your app is only in one language, simply because it keeps all your language
 * in one place (in this case, /i18n/en-US.i18n.yml). It makes it super easy
 * to change all buttons labeled "Cancel" to "No Way!", and if you decide to
 * add extra languages down the road, it will make your life a lot easier.
 */

export default ColorList = ({colors, onChooseColor}) => {
  return <div style={styles.colorList}>
    <h1>{i18n.__('sidebar.title')}</h1>
    <p>
      {i18n.__('sidebar.instructions')}
    </p>

    <ul>
      {colors.map(function (color) {
        const hexR = ('00' + color.Rvalue.toString(16)).slice(-2);
        const hexG = ('00' + color.Gvalue.toString(16)).slice(-2);
        const hexB = ('00' + color.Bvalue.toString(16)).slice(-2);
        const hexColor = `#${hexR}${hexG}${hexB}`;

        /*
         * In React, any time you have a list of things (whether it's <li> or
         * <YourOwnComponent>, you have to specify a unique key parameter.
         * I won't get into the specifics as to why (it's a bit technical), but
         * you should pass a unique value. And *don't* use an index/counter!
         */
        return <li style={{opacity: color.saving ? 0.5 : 1}} key={color._id}>
          {hexColor}
          <div
            style={{
              backgroundColor: hexColor,
              cursor: 'pointer',
              display: 'inline-block',
              height: '16px',
              width: '60px'
            }}
            onClick={
              /*
               * When the user clicks the color swatch, call onChooseColor() and
               * pass the color. Note the .getColor() method, we'll cover that
               * later.
               *
               * We also could've written this as:
               * onClick={onChooseColor.bind(null, color.getColor())}
               *
               * We couldn't have done this:
               * onClick={onChooseColor(color.getColor())}
               *
               * because it would actually call onChooseColor() immediately, not
               * when the user clicks.
               */
              () => onChooseColor(color.getColor())
             }
          ></div>
        </li>
      })}
    </ul>
  </div>
}

ColorList.propTypes = {
  colors: PropTypes.array.isRequired,
  onChooseColor: PropTypes.func.isRequired,
};

// Now open up /client/components/ColorSetter.jsx
