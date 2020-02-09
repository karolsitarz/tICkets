import React from 'react';
import PropTypes from 'prop-types';

const TrainSide = ({ className }) => (
  <svg className={className} viewBox="0 -81 512 512" fill="currentColor">
    <path d="m230.332031 168.667969v-94h136.371094l-63.542969-50.027344c-20.183594-15.890625-45.445312-24.640625-71.132812-24.640625h-232.027344v74.667969h175v94h-175v117.332031h446.734375c35.988281 0 65.265625-29.277344 65.265625-65.265625 0-20.136719-9.074219-38.828125-24.894531-51.28125l-1-.789063h-255.773438zm0 0" />
    <path d="m260.332031 104.667969v34h187.667969l-43.1875-34zm0 0" />
    <path d="m0 104.667969h145v34h-145zm0 0" />
    <path d="m0 320h512v30h-512zm0 0" />
  </svg>
);

TrainSide.propTypes = {
  className: PropTypes.string
};

export default TrainSide;
