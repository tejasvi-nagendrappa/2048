import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  cellValue: PropTypes.number.isRequired,
};

const Cell = ({ cellValue }) => {
  const value = (cellValue === 0) ? '' : cellValue;
  return (
    <div className="Cell">
      <div className="Number">{value}</div>
    </div>
  );
};

Cell.propTypes = propTypes;
export default Cell;
