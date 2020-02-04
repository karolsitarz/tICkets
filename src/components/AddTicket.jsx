import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ticketActions } from '../stores/tickets';

import pdfExtract from '../util/pdfExtract';

const Label = styled.label`
  > input {
    display: none;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  color: #fff;
  background: #666;
  cursor: pointer;
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
      <Button>Add ticket</Button>
      <input type="file" accept="application/pdf" onChange={handleChange} />
    </Label>
  );
};

export default AddTicket;
