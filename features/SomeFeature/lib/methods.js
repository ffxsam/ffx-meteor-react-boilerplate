import {Meteor} from 'meteor/meteor';
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

// Make stuff accessible in web console and meteor shell
if (process.env.NODE_ENV === 'development') {
  global.Methods = {someMethod};
}
