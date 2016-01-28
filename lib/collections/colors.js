import {Astro} from 'meteor/jagi:astronomy';

// Define a new collection called Colors, linked to db.colors in MongoDB
const Colors = new Mongo.Collection('colors');

/* Astronomy class definition. Like SimpleSchema, but lets you use Color as
 * a true object, e.g. c = new Color() or c = new Color({R: 8, G: 100, B: 12})
 */
const Color = Astro.Class({
  name: 'Color', // name of this model/object
  collection: Colors, // the collection it should be associated with
  fields: {
    /*
     * The properties of this object and their datatypes. It's worth noting that
     * you *must* defined everything here that you plan on ever using. If you
     * leave out a field, it will not be saved in the database.
     */
    R: 'number',
    G: 'number',
    B: 'number',
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
      const {R, G, B} = this;
      return {R, G, B}
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
 * Definitely remove these lines before launching into production!
 */
global.Colors = Colors;
global.Color = Color;

// Let's move into the server side of things. Open /server/publications.js
