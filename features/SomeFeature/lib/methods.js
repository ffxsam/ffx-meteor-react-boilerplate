import {ValidatedMethod} from 'meteor/mdg:validated-method';

export const someMethod = new ValidatedMethod({
  name: 'someMethod',

  validate(arg1) {
    const badThing = false;

    if (badThing) {
      throw new Meteor.Error('some-error', 'Detailed message');
    }
  },

  run(arg1) {
  }
});
