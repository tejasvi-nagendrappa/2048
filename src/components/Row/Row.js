import React from 'react';
import PropTypes from 'prop-types';
import Cell from 'components/Cell';

const propTypes = {
  row: PropTypes.arrayOf(PropTypes.number).isRequired
};

const Row = ({ row }) => {
  return (
    <div className="Row">
      {row.map((val, i) => (<Cell key={`Cell_${i}`} cellValue={val} />))}
    </div>
  );
};

Row.propTypes = propTypes;
export default Row;
