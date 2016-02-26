import {Mongo} from 'meteor/mongo';
import {Astro} from 'meteor/jagi:astronomy';

// Define a new collection called Colors, linked to db.colors in MongoDB
export const Colors = new Mongo.Collection('colors');

/*
 * We'll be using a schema/ORM library called Astronomy, which is similar to
 * SimpleSchema. I really like Astronomy's ability to let you interact with
 * your Mongo collection through a more OOP approach.
 *
 * Below is a validator I'm creating to help validate color objects to make sure
 * they fall within spec (RGB values should be from 0 to 255).
 *
 * Astronomy's documentation can be found here:
 * http://astronomy.jagi.io/
 */

Astro.createValidator({
  name: 'color',

  // How to validate this field; valid if we return true
  validate(value) {
    return typeof(value) === 'number' && value >= 0 && value <= 255;
  },

  events: {
    // If validation fails..
    validationError(e) {
      const {fieldName, fieldValue} = e.data;

      if (typeof fieldValue === 'number') {
        e.setMessage(`Color value ${fieldValue} is out of range` +
                     ` (should be from 0-255)`);
      } else {
        e.setMessage(`Missing or invalid color value (${fieldValue})`);
      }

      e.stopPropagation();

      /*
       * Once you have a color object, you can use color.validate() to check
       * if the color value is valid or not. If not, use
       * color.getValidationErrors() to retrieve the error(s). We do this in
       * /lib/methods.js.
       */
    }
  }
});

/*
 * Astronomy class definition. We can use Color as a true object, e.g.:
 * c = new Color() or c = new Color({R: 8, G: 100, B: 12})
 */
export const Color = Astro.Class({
  name: 'Color', // name of this model/object

  collection: Colors, // the collection it should be associated with

  fields: {
    /*
     * The properties of this object and their datatypes. It's worth noting that
     * you *must* define everything here that you plan on ever using. If you
     * leave out a field, it will not be saved in the database.
     */
    Rvalue: {
      type: 'number',
      validator: Validators.color()
    },
    Gvalue: {
      type: 'number',
      validator: Validators.color()
    },
    Bvalue: {
      type: 'number',
      validator: Validators.color()
    },
    saving: 'boolean', //in the process of being saved to DB?
    createdAt: 'date'
  },

  /*
   * Astronomy lets you define methods that can be attached to an object, which
   * come in really handy. In this case, you could define a new color and then
   * easily get its value:
   *
   * const myColor = new Color({R: 230, G: 10, B: 48});
   * console.log(myColor.getColor()); // <--- dumps out {R: 230, G: 10, B: 48}
   */

  methods: {
    getColor() {
      const {Rvalue, Gvalue, Bvalue} = this;
      return {Rvalue, Gvalue, Bvalue}
    }
  },
  /*
   * Astronomy also supports events, so we can easily attach a timestamp to
   * when our new color was inserted into the database.
   */

  events: {
    beforeInsert() {
      this.createdAt = new Date();
    }
  }
});

/*
 * Make these global, for easier use within meteor shell, browser console, etc.
 * Only applies while we're in development.
 */
if (process.env.NODE_ENV === 'development') {
  global.Colors = Colors;
  global.Color = Color;
}

// Let's move into the server side of things. Open /server/publications.js
