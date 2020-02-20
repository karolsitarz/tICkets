import React from 'react';
import PropTypes from 'prop-types';

const More = ({ className }) => (
  <svg className={className} viewBox="0 0 341.333 341.333" fill="currentColor">
    <path d="M42.667,128C19.093,128,0,147.093,0,170.667s19.093,42.667,42.667,42.667c23.573,0,42.667-19.093,42.667-42.667 S66.24,128,42.667,128z" />
    <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z" />
    <path d="M298.667,128C275.093,128,256,147.093,256,170.667s19.093,42.667,42.667,42.667c23.573,0,42.667-19.093,42.667-42.667 S322.24,128,298.667,128z" />
  </svg>
);

More.propTypes = {
  className: PropTypes.string
};

export default More;
