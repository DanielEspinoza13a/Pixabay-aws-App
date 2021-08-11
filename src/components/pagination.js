import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ previousPage, nextPage }) => (

  // eslint-disable-next-line react/jsx-filename-extension
  <div>
    <button
      onClick={previousPage}
      type="button"
      className="btn btn-info"
      style={{ marginRight: '5px' }}
    >
      Previous &larr;
    </button>

    <button onClick={nextPage} type="button" className="btn btn-info">
      Next &rarr;
    </button>
  </div>

);

Pagination.propTypes = {
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,

};

export default Pagination;
