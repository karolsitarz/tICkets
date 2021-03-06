import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  will-change: transform;
  pointer-events: none;
  display: inline-flex;
  flex-direction: ${props => (props._horizontal ? 'row' : 'column')};
`;

const LOCK_ZONE = 100;

const ScrollInput = ({
  friction,
  onStop,
  horizontal,
  parent: ParentContainer,
  children,
  initial,
  onClick
}) => {
  let containerDOM = useRef(null);
  let wrapperDOM = useRef(null);
  let firstPos;
  let move = 0;
  let acc = 0;

  let free = true;
  let pos = 0;
  let prevPos = 0;

  let containerSize;
  let valuesSize;

  let locked = true;
  let lockedPos;

  let current = initial;

  const posAccessor = horizontal ? 'clientX' : 'clientY';
  const sizeAccessor = horizontal ? 'width' : 'height';

  const getContainerSize = () =>
    containerDOM.current.getBoundingClientRect()[sizeAccessor];

  //register and unregister events
  useEffect(() => {
    if (children.length === 0) return;
    handleResize();

    containerDOM.current.addEventListener('pointerdown', handlePointerDown);
    containerDOM.current.style.touchAction = 'none';
    window.addEventListener('resize', handleResize);

    return () => {
      containerDOM.current.removeEventListener(
        'pointerdown',
        handlePointerDown
      );
      window.removeEventListener('resize', handleResize);
    };
  }, [children]);

  const moveToN = n => {
    current = n > 0 && n < valuesSize.length ? n : 0;
    move = containerSize / 2 - valuesSize[current].middle;
    transform(move);
  };

  const handleResize = () => {
    valuesSize = getValuesSize();
    containerSize = getContainerSize();
    moveToN(current);
  };

  const getValuesSize = () => {
    const values = wrapperDOM.current.children;
    const accessor = horizontal
      ? {
          offset: 'offsetLeft',
          margin: 'marginLeft',
          size: 'offsetWidth'
        }
      : {
          offset: 'offsetTop',
          margin: 'marginTop',
          size: 'offsetHeight'
        };
    const temp = [];
    for (let el of values) {
      const margin = parseFloat(
        window.getComputedStyle(el, null)[accessor.margin]
      );
      const start = el[accessor.offset];
      const size = el[accessor.size];
      el.style.setProperty('--h', el.offsetHeight + 'px');

      temp.push({
        start: start - margin,
        middle: start + size / 2
      });
    }
    return temp;
  };

  const transform = val => {
    if (horizontal) {
      wrapperDOM.current.style.transform = `translate3d(${val}px, 0, 0)`;
    } else {
      wrapperDOM.current.style.transform = `translate3d(0, ${val}px, 0)`;
    }
  };

  const handlePointerDown = e => {
    e.preventDefault();

    locked = true;
    lockedPos = {
      clientX: e.clientX,
      clientY: e.clientY
    };
    free = false;
    firstPos = e[posAccessor] - move;
    prevPos = e[posAccessor];
    pos = e[posAccessor];

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  const handleMove = e => {
    e.preventDefault();
    if (locked) {
      if (
        Math.pow(lockedPos.clientX - e.clientX, 2) +
          Math.pow(lockedPos.clientY - e.clientY, 2) >
        LOCK_ZONE
      )
        locked = false;
      return;
    }

    move = e[posAccessor] - firstPos;
    transform(move);

    prevPos = pos;
    pos = e[posAccessor];
  };

  const handlePointerUp = e => {
    e.preventDefault();
    const removeListeners = () => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
    if (locked) {
      removeListeners();
      onClick && onClick(e);
      return;
    }

    free = true;
    // temporary acceleration
    acc = pos - prevPos;
    // distance that will be traveled, calculated by acceleration and friction
    const dist = -(move + acc / (1 - friction));

    current =
      valuesSize.findIndex(({ start }) => start > dist + containerSize / 2) - 1;
    if (current === -1) current = 0;
    else if (current === -2) current = valuesSize.length - 1;

    const newDist = valuesSize[current].middle - containerSize / 2;
    // correct acceleration
    acc = -(newDist - -move) * (1 - friction);

    removeListeners();
    requestAnimationFrame(freeRoll);
  };

  const freeRoll = () => {
    if (!free) return;
    if (Math.abs(acc) < 0.1) {
      acc = 0;
      onStop && onStop(current);
      return;
    }

    move += acc;
    transform(move);
    acc *= friction;

    requestAnimationFrame(freeRoll);
  };

  return (
    <ParentContainer ref={containerDOM}>
      <Wrapper _horizontal={horizontal} ref={wrapperDOM}>
        {children}
      </Wrapper>
    </ParentContainer>
  );
};

ScrollInput.propTypes = {
  friction: PropTypes.number,
  onStop: PropTypes.func,
  horizontal: PropTypes.bool,
  parent: PropTypes.object.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  initial: PropTypes.number,
  onClick: PropTypes.func
};

ScrollInput.defaultProps = {
  friction: 0.9,
  horizontal: false,
  initial: 0
};

export default ScrollInput;
