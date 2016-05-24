import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

import { globalizeData } from '../helpers';

export const Entries = new Mongo.Collection('entries');

export const Entry = Class.create({
  name: 'Entry',
  collection: Entries,
  fields: {
    name: String,
  },
});

globalizeData({ Entries }, { Entry });
