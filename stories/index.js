import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, number } from '@storybook/addon-knobs/react';

// eslint-disable-next-line unicorn/import-index
import Pagination from '../index';

const styles = {
  margin: 'auto',
  maxWidth: 800
};
const DummyPage = storyFn => <div style={styles}>{storyFn()}</div>;

storiesOf('Pagination', module)
  .addDecorator(DummyPage)
  .addDecorator(withKnobs)
  .add('with n pages and variable visible radius', () => (
    <Pagination
      pages={number('pages', 3)}
      currentPage={number('currentPage', 1)}
      visibleRadius={number('visibleRadius', 2)}
      onChange={action('Page Change')}
    />
  ))

  .add('with style modifiers buttons', () => (
    <Pagination
      pages={10}
      currentPage={5}
      isRounded={boolean('is-rounded', false)}
      isSmall={boolean('is-small', false)}
      isMedium={boolean('is-medium', false)}
      isLarge={boolean('is-large', false)}
      isCentered={boolean('is-centered', false)}
      isRight={boolean('is-right', false)}
      onChange={action('Page Change')}
    />
  ));
