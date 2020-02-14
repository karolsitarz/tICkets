import React from 'react';
import PropTypes from 'prop-types';

const showIf = condition => ({
  display: condition ? 'initial' : 'none'
});

const Location = ({ className, isFirst, isLast, isCurrent }) => (
  <svg className={className} viewBox="0 0 800 800" fill="currentColor">
    <path d="M400,640c-132.548,0-240-107.452-240-240S267.452,160,400,160,640,267.452,640,400,532.548,640,400,640Zm0-420A180,180,0,1,0,580,400,180,180,0,0,0,400,220Z" />
    <path style={showIf(!isFirst)} d="M430,608V770a30,30,0,0,1-60,0V608h60Z" />
    <path style={showIf(!isLast)} d="M430,0V162a30,30,0,0,1-60,0V0h60Z" />
    <circle style={showIf(isCurrent)} cx="400" cy="400" r="125" />
  </svg>
);

Location.propTypes = {
  className: PropTypes.string,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  isCurrent: PropTypes.bool
};

export default Location;
