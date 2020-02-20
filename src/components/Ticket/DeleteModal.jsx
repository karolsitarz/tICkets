import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { MoreIcon } from 'components/Icons';

const DeleteModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  transform: translate3d(0, 100%, 0);
  transform: ${({ _visible }) => _visible && 'translate3d(0, 0, 0)'};
  background-image: inherit;
  font-weight: bold;
  color: #fff;
  padding: 2em 1.5em;
`;

const DeleteModalButton = styled.div`
  align-self: stretch;
  display: flex;
  padding: 0.5em;
  margin: 0.25em;
  justify-content: center;
  align-items: center;
  background-color: ${({ primary }) => primary && '#ffffff33'};
  border-radius: 0.5em;
`;

const DeleteModalText = styled.span`
  font-size: 1.1em;
  text-align: center;
  margin-bottom: 2em;
`;

const DeleteButton = styled.div`
  position: absolute;
  width: 50%;
  right: 0;
  top: 0;
  height: 2em;
  padding-right: 0.5em;
  padding-left: 2em;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    height: 1em;
    width: 1em;
    opacity: 0.8;
  }
`;

const DeleteModal = ({ visible, confirm, cancel, toggle }) => (
  <>
    <DeleteButton onClick={toggle}>
      <MoreIcon />
    </DeleteButton>
    <DeleteModalContainer _visible={visible}>
      <DeleteModalText>Do you want to delete this ticket?</DeleteModalText>
      <DeleteModalButton primary onClick={confirm}>
        Confirm
      </DeleteModalButton>
      <DeleteModalButton onClick={cancel}>Cancel</DeleteModalButton>
    </DeleteModalContainer>
  </>
);

export default DeleteModal;

DeleteModal.propTypes = {
  visible: PropTypes.bool,
  confirm: PropTypes.func,
  cancel: PropTypes.func,
  toggle: PropTypes.func
};
