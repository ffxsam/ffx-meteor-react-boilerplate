import React from 'react';
import renderer from 'react-test-renderer';
import Thing from '../Thing/Thing';

test('Just takes a snapshot', () => {
  const component = renderer.create(
    <Thing />
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
