import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

import { globalizeData } from '../helpers';

export const SomeItems = new Mongo.Collection('someItems');

export const SomeItem = Class.create({
  name: 'SomeItem',
  collection: SomeItems,
  fields: {
    name: String,
  },
});

// Make stuff accessible in web console and meteor shell
globalizeData({ SomeItems }, { SomeItem });
