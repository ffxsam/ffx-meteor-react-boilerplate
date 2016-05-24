import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Thing from '../features/SomeFeature/components/Thing';

storiesOf('Button', module)
  .add('normal', () => (
    <Thing />
  ));
