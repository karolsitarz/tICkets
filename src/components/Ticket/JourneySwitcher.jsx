import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ArrowRightIcon, ArrowLeftIcon } from 'components/Icons';

const JourneyButton = styled.div`
  position: absolute;
  height: 2em;
  width: 50%;
  bottom: 0;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.25s ease;
  background: #0002;
  ${({ _visible }) =>
    !_visible &&
    css`
      opacity: 0;
      cursor: auto;
      pointer-events: none;
    `}
  > svg {
    height: 1em;
  }
`;

const LeftButton = styled(JourneyButton)`
  left: 0;
  padding-left: 0.5em;
  padding-right: 2em;
`;
const RightButton = styled(JourneyButton)`
  right: 0;
  padding-right: 0.5em;
  padding-left: 2em;
`;

const JourneySwitcher = ({ left, right, onClick, hidden }) => {
  const subtract = useCallback(e => {
    e.stopPropagation();
    onClick(-1);
  });
  const add = useCallback(e => {
    e.stopPropagation();
    onClick(1);
  });
  return (
    <>
      <LeftButton onClick={subtract} _visible={left && !hidden}>
        <ArrowLeftIcon />
      </LeftButton>
      <RightButton onClick={add} _visible={right && !hidden}>
        <ArrowRightIcon />
      </RightButton>
    </>
  );
};

JourneySwitcher.propTypes = {
  left: PropTypes.bool,
  right: PropTypes.bool,
  onClick: PropTypes.func,
  hidden: PropTypes.bool
};

export default JourneySwitcher;
