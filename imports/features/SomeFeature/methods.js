import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const someMethod = new ValidatedMethod({
  name: 'someMethod',

  validate(args) {
    check(args, {
      data: Object,
    });
  },

  run({ data }) {
    console.log('Executing on client?', this.isSimulation);
    console.log('Got data:', data);
  },
});
