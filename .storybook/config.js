import { configure } from '@kadira/storybook';

function loadStories() {
  require('../imports/stories/index');
}

configure(loadStories, module);
