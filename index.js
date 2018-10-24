import React from 'react';
import PropTypes from 'prop-types';

export const Page = ({ currentPage, index, onChange, className }) => (
  <li>
    <a
      className={`pagination-link ${className} ${(currentPage === index ||
        (index === 1 && !currentPage)) &&
        'is-current'}`}
      aria-label={`Goto page ${index}`}
      aria-current={index === currentPage && 'page'}
      onClick={() => onChange(index)}
    >
      {index}
    </a>
  </li>
);

Page.propTypes = {
  currentPage: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

Page.defaultProps = {
  className: ''
};

const Ellipses = () => (
  <li>
    <span className="pagination-ellipsis">&hellip;</span>
  </li>
);

export const getVisiblePages = (visibleRadius, currentPage, maxPages) => {
  const visiblePages = [];

  let start = currentPage - visibleRadius;
  let end = currentPage + visibleRadius;

  if (start < 1) {
    start = 1;
    end = start + visibleRadius * 2;
  }

  if (end > maxPages) {
    start = maxPages - visibleRadius * 2;
    end = maxPages;
  }

  if (visibleRadius * 2 + 1 > maxPages) {
    start = 1;
    end = maxPages;
  }

  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }

  return visiblePages;
};

const Pagination = ({
  pages,
  currentPage,
  visibleRadius,
  className,
  isRounded,
  isSmall,
  isMedium,
  isLarge,
  isCentered,
  isRight,
  prevClassName,
  nextClassName,
  linkClassName,
  listClassName,
  onChange
}) => {
  const visiblePages = getVisiblePages(visibleRadius, currentPage, pages);
  const pagesComponents = [];

  const classes = [
    isRounded && 'is-rounded',
    isSmall && 'is-small',
    isMedium && 'is-medium',
    isLarge && 'is-large',
    isCentered && 'is-centered',
    isRight && 'is-right'
  ].filter(Boolean);

  if (visiblePages[0] >= 2) {
    pagesComponents.push(
      <Page
        key="page-1"
        index={1}
        currentPage={currentPage}
        onChange={onChange}
      />
    );

    if (visiblePages[0] !== 2) {
      pagesComponents.push(<Ellipses key="ellipses-1" />);
    }
  }

  visiblePages.map(page =>
    pagesComponents.push(
      <Page
        key={`page-${page}`}
        index={page}
        currentPage={currentPage}
        onChange={onChange}
      />
    )
  );
  if (currentPage <= pages - visibleRadius - 1 && visiblePages.length < pages) {
    if (currentPage < pages - visibleRadius - 1) {
      pagesComponents.push(<Ellipses key="ellipses-2" />);
    }

    pagesComponents.push(
      <Page
        key={`page-${pages}`}
        className={linkClassName}
        index={pages}
        currentPage={currentPage}
        onChange={onChange}
      />
    );
  }

  return (
    <nav
      className={`pagination-container pagination ${classes.join(
        ' '
      )} ${className}`}
      role="navigation"
      aria-label="pagination"
    >
      <a
        disabled={currentPage === 1}
        className={`pagination-previous nav ${prevClassName}`}
        onClick={() => onChange(currentPage - 1)}
      >
        Previous
      </a>
      <a
        disabled={currentPage === pages}
        className={`pagination-next nav ${nextClassName}`}
        onClick={() => onChange(currentPage + 1)}
      >
        Next page
      </a>

      <ul className={`pagination-list ${listClassName}`}>{pagesComponents}</ul>
    </nav>
  );
};

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  visibleRadius: PropTypes.number,
  className: PropTypes.string,
  prevClassName: PropTypes.string,
  nextClassName: PropTypes.string,
  linkClassName: PropTypes.string,
  listClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isRounded: PropTypes.bool,
  isSmall: PropTypes.bool,
  isMedium: PropTypes.bool,
  isLarge: PropTypes.bool,
  isCentered: PropTypes.bool,
  isRight: PropTypes.bool
};

Pagination.defaultProps = {
  currentPage: 1,
  visibleRadius: 1,
  className: '',
  prevClassName: '',
  nextClassName: '',
  linkClassName: '',
  listClassName: '',
  isRounded: false,
  isSmall: false,
  isMedium: false,
  isLarge: false,
  isCentered: false,
  isRight: false
};

export default Pagination;
