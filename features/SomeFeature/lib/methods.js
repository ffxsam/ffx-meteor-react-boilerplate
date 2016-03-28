import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const someMethod = new ValidatedMethod({
  name: 'someMethod',

  validate(args) {
    const badThing = false;

    if (badThing) {
      throw new Meteor.Error('some-error', 'Detailed message');
    }
  },

  run(args) {
  },
});
