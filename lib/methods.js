import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {Color} from '../lib/collections/colors';

/*
 * Meteor methods are essentially functions that can be called via Meteor.call,
 * so that the client can communicate with the server. Methods should usually
 * be defined in the /lib folder, so that you can benefit from "optimistic UI."
 * Optimistic UI is essentially having the client react positively to user
 * interaction before the action has been committed to the server. If you've
 * ever liked a post on Facebook only to see your like disappear a second later
 * followed by an error, that's optimistic UI in action, and its purpose is to
 * provide an apparently snappier user experience. In Meteor, we achieve this
 * effect by defining the same exact function on the client (which is a
 * simulation, and only for visual feedback) and on the server (where the actual
 * logic occurs).
 *
 * You can read more about methods in general and optimistic UI here:
 * http://guide.meteor.com/methods.html#basic
 *
 * UPDATE: Per the Meteor Guide, this code is now using validated methods. You
 * can learn more about them here:
 * http://guide.meteor.com/methods.html#advanced-boilerplate
 */

export const saveColor = new ValidatedMethod({
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
     * For our optimistic UI, we'd like to make it so a newly saved color
     * will appear, though faded, until it's actually saved on the server.
     * We'll do this by having a field called 'saving' which will always be
     * set to false on the server, but will be set to true on the client.
     * Once it's saved to the server, the false value will be propagated up
     * to the client.
     */

    /*
     * this.isSimulation yields 'true' if we're in a simulated run (client)
     * or 'false' if we're on the server side.
     */
    c.set('saving', this.isSimulation);

    if (!this.isSimulation) {
      // Simulated server lag
      Meteor._sleepForMs(1000);
    }

    c.save();
  }
});

/*
 * This should cover just about everything! If you have any questions or spot
 * any issues or mistakes, please open an issue here:
 * https://github.com/ffxsam/ffx-meteor-react-boilerplate/issues
 *
 * Now you can run "npm run exit" to get out of the example app and get back
 * into the boilerplate.
 */
