import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { styles } from './shared';

storiesOf('common.button', module)
  .addDecorator(story => (
    <div style={styles.root}>
      {story()}
    </div>
  ))
  .add('normal', () => (
    <button type="button">Click</button>
  ));
