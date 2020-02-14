import React from 'react';
import PropTypes from 'prop-types';

const ArrowRight = ({ className }) => (
  <svg className={className} viewBox="0 0 341.333 341.333" fill="currentColor">
    <polygon points="170.667,0 140.48,30.187 259.627,149.333 0,149.333 0,192 259.627,192 140.48,311.147 170.667,341.333 341.333,170.667" />
  </svg>
);

ArrowRight.propTypes = {
  className: PropTypes.string
};

export default ArrowRight;
