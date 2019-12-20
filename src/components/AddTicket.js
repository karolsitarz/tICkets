import React, { useContext } from 'react';
import styled from 'styled-components';
import { TicketContext } from '../context';

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
  border-radius: 25%;
  width: 2em;
  height: 2em;
  background: palegreen;
  cursor: pointer;
`;

const AddTicket = () => {
  const [store, setStore] = useContext(TicketContext);
  const handleChange = async e => {
    const data = await pdfExtract(e);
    setStore([...store, data]);
  };
  return (
    <Label>
      <Button>t</Button>
      <input type="file" accept="application/pdf" onChange={handleChange} />
    </Label>
  );
};

export default AddTicket;
