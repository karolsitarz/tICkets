import React from 'react';
import PropTypes from 'prop-types';

const ArrowLeft = ({ className }) => (
  <svg className={className} viewBox="0 0 341.333 341.333" fill="currentColor">
    <polygon points="341.333,149.333 81.707,149.333 200.853,30.187 170.667,0 0,170.667 170.667,341.333 200.853,311.147 81.707,192 341.333,192" />
  </svg>
);

ArrowLeft.propTypes = {
  className: PropTypes.string
};

export default ArrowLeft;
