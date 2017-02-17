import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { globalizeData } from '../helpers';

export const Entries = new Mongo.Collection('entries');

Entries.schema = new SimpleSchema({
  name: String,
});

globalizeData({ Entries });
