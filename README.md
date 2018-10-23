# bulma-pagination-react

[Bulma pagination](https://bulma.io/documentation/components/pagination/) as a [react](https://reactjs.org/) component.

## Installation

```sh
yarn add bulma-pagination-react
```

## Usage

To start using the pagination component all you need to do is provide how many pages there are and what page the user is on. All other properties are optional

```js
import React from 'react';
import Pagination from 'bulma-pagination-react';

const POSTS_PER_PAGE = 10;

const Pager = ({ posts, currentPage, perPage = POSTS_PER_PAGE }) => {
  const pages = Math.ceil(posts.length / perPage);

  return (
    <Pagination
      pages={pages}
      currentPage={currentPage}
      onChange={page => console.log(`/blog?page=${page}`)}
    />
  );
};

export default Pager;
```

### onChange

Function called when a button or page link is clicked. The only argument supplied to the function is the new page number.

### visibleRadius

Modify how many page elements are visible in the pagination component. Defaults to 1.

### className

`bulma-pagination-react` has classes that effect all elements in the component.

- className: ClassName for the wrapper
- prevClassName: ClassName for the previous button
- nextClassName: ClassName for the next button
- linkClassName: ClassName for each page link
- listClassName: ClassName for the list of page links
