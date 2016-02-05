import {ValidatedMethod} from 'meteor/mdg:validated-method';
import invariant from 'invariant';
import {Color} from '../lib/collections/colors';

/*
 * Meteor methods are essentially functions that can be called via Meteor.call,
 * so that the client can communicate with the server. Methods can also exist
 * in the client, but we won't cover those details here. For the purposes of
 * this walkthrough, just assume that methods are server-side and where you
 * should perform any database operations or handle other sensitive material
 * that you don't want getting to the client.
 *
 * Read more about methods: http://docs.meteor.com/#/full/meteor_methods
 *
 * UPDATE: Per the Meteor Guide (http://guide.meteor.com), this code is now
 * using validated methods. You can learn more about them here:
 * http://guide.meteor.com/methods.html#advanced-boilerplate
 *
 * We have to use a global since you can't import modules from server into the
 * client.
 */
Methods = {
  saveColor: new ValidatedMethod({
    name: 'saveColor',

    validate(rgb) {
      const color = new Color(rgb);

      if (!color.validate()) {
        throw new Meteor.Error('invalid-color', color.getValidationErrors());
      }
    },

    run(color) {
      /*
       * If we weren't using Astronomy, we could do:
       * Colors.insert({R: color.R, G: color.G, B: color.B, createdAt: new Date()});
       *
       * or a little bit shorter:
       * Colors.insert(Object.assign({}, color, {createdAt: new Date()}));
       */

      const c = new Color(color);

      /*
       * If 'saving' is true, the color is displayed with an opacity value of
       * 0.5. This is to indicate that a database save is in progress. We only
       * want to do this on the client side.
       */
      c.set('saving', this.isSimulation);

      if (!this.isSimulation) {
        // Simulated server lag
        Meteor._sleepForMs(1000);
      }

      c.save();
    }
  })
};

// TODO: Conclusion
