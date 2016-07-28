import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const someMethod = new ValidatedMethod({
  name: 'someMethod',

  validate(args) {
    check(args, {
      name: String,
    });
  },

  run({ name }) {
    console.log('Executing on client?', this.isSimulation);
    console.log('Got name:', name);
    return name;
  },
});
