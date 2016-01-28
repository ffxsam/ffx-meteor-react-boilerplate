import invariant from 'invariant';

/*
 * Meteor methods are essentially functions that can be called via Meteor.call,
 * so that the client can communicate with the server. Methods can also exist
 * in the client, but we won't cover those details here. For the purposes of
 * this walkthrough, just assume that methods are server-side and where you
 * should perform any database operations or handle other sensitive material
 * that you don't want getting to the client.
 *
 * Read more about methods: http://docs.meteor.com/#/full/meteor_methods
 */
Meteor.methods({
  /*
   * If you recall in ColorSetterContainer, we made a call to saveColor() and
   * passed in a color (of format {R: x, G: y, B: z}). Now we're going to save
   * it into the database.
   */
  saveColor(color) {
    try {
      // Make sure the color argument passed is of the format {R: x, G: y, B: z}
      // If not, an error will be thrown
      check(color, {
        R: Number,
        G: Number,
        B: Number
      });

      const {R, G, B} = color;

      /*
       * Make sure the RGB values are within range.
       * This will just throw an error, so we fall into our 'catch' block below
       */
      invariant(R >= 0 && R <= 255 && G >= 0 && G <= 255 && B >= 0 && B <= 255,
        ''); // message doesn't matter since we'll never see it anyway

      // Instantiate a new Color object with our new color, and save it.
      (new Color(color)).save();

      /*
       *  If we weren't using Astronomy, we could do:
       *
       *  Colors.insert({R: color.R, G: color.G, B: color.B, createdAt: new Date()});
       *
       *  or a little bit shorter:
       *
       *  Colors.insert(Object.assign({}, color, {createdAt: new Date()}));
       */
    } catch (e) {
      // Properly handle the error
      console.log(e);
      throw new Meteor.Error('invalid-color', 'The supplied color was invalid');
    }
  }
});

/*
 * Conclusion?
 */
