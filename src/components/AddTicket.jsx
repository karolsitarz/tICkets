import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ticketActions } from '../stores/tickets';

import pdfExtract from '../util/pdfExtract';

const Label = styled.label`
  align-self: center;
  margin: 2em 0;
  > input {
    display: none;
  }
`;

const Button = styled.div`
  color: #505050;
  background: #f1f1f1;
  padding: 1em 3em;
  border-radius: 1em;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 1em 2em #00000040;
`;

const AddTicket = () => {
  const dispatch = useDispatch();

  const handleChange = async e => {
    try {
      const data = await pdfExtract(e);
      console.log(data);
      dispatch(ticketActions.addTicket(data));
    } catch (e) {}
  };
  return (
    <Label>
      <Button>New ticket</Button>
      <input type="file" accept="application/pdf" onChange={handleChange} />
    </Label>
  );
};

export default AddTicket;
