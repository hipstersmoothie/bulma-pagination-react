import React from 'react';

import renderer from 'react-test-renderer';

// eslint-disable-next-line unicorn/import-index
import Pagination, { Page, getVisiblePages } from '../index';

const render = element => renderer.create(element).toJSON();

describe('Page', () => {
  test('should display a numbered element', () => {
    expect(
      render(<Page currentPage={1} index={19} onChange={() => {}} />)
    ).toMatchSnapshot();
  });

  test('should be different for matching current', () => {
    expect(
      render(<Page currentPage={1} index={1} onChange={() => {}} />)
    ).toMatchSnapshot();
  });

  test('should use className', () => {
    expect(
      renderer
        .create(
          <Page
            currentPage={1}
            index={1}
            className="foo-bar"
            onChange={() => {}}
          />
        )
        .root.findByProps({ className: 'foo-bar' })
    ).toBeDefined();
  });

  test('should use onChange callback', () => {
    const onChange = jest.fn();
    const tree = renderer.create(
      <Page currentPage={1} index={1} onChange={onChange} />
    );
    tree.root.find(e => e.type === 'a').props.onClick();
    expect(onChange).toHaveBeenCalledWith(1);
  });
});

describe('getVisiblePages', () => {
  test('at start of list', () => {
    expect(getVisiblePages(1, 1, 10)).toEqual([1, 2, 3]);
  });

  test('at end of list', () => {
    expect(getVisiblePages(1, 10, 10)).toEqual([8, 9, 10]);
  });

  test('in the middle of a list', () => {
    expect(getVisiblePages(1, 5, 10)).toEqual([4, 5, 6]);
  });

  test('less pages than radius', () => {
    expect(getVisiblePages(1, 1, 2)).toEqual([1, 2]);
  });
});

describe('Pagination', () => {
  test('should render pages at start', () => {
    expect(
      render(<Pagination pages={10} onChange={() => {}} />)
    ).toMatchSnapshot();
  });

  test('should render pages at start with many', () => {
    expect(
      render(<Pagination pages={10} currentPage={4} visibleRadius={2} />)
    ).toMatchSnapshot();
  });

  test('should render pages in middle', () => {
    expect(
      render(<Pagination pages={10} currentPage={5} onChange={() => {}} />)
    ).toMatchSnapshot();
  });

  test('should render pages at end', () => {
    expect(
      render(<Pagination pages={10} currentPage={10} onChange={() => {}} />)
    ).toMatchSnapshot();
  });

  test('should render with no ellipses if not needed - visible == max', () => {
    expect(
      render(<Pagination pages={3} currentPage={1} onChange={() => {}} />)
    ).toMatchSnapshot();
  });

  test('should render with no ellipses if not needed - end', () => {
    expect(
      render(<Pagination pages={10} currentPage={8} onChange={() => {}} />)
    ).toMatchSnapshot();
  });

  test('should render with no ellipses if not needed - start', () => {
    expect(
      render(<Pagination pages={10} currentPage={3} onChange={() => {}} />)
    ).toMatchSnapshot();
  });

  test('should call callback when previous clicked', () => {
    const onChange = jest.fn();
    const tree = renderer.create(
      <Pagination currentPage={1} pages={10} onChange={onChange} />
    );
    tree.root
      .find(
        e => e.type === 'a' && e.props.className.includes('pagination-previous')
      )
      .props.onClick();
    expect(onChange).toHaveBeenCalledWith(0);
  });

  test('should call callback when next clicked', () => {
    const onChange = jest.fn();
    const tree = renderer.create(
      <Pagination currentPage={1} pages={10} onChange={onChange} />
    );
    tree.root
      .find(
        e => e.type === 'a' && e.props.className.includes('pagination-next')
      )
      .props.onClick();
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
