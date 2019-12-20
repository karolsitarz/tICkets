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
  color: #fff;
  width: 2em;
  height: 2em;
  background: #666;
  cursor: pointer;
`;

const AddTicket = () => {
  const [store, setStore] = useContext(TicketContext);
  const handleChange = async e => {
    const data = await pdfExtract(e);
    if (store.findIndex(el => el.id === data.id) >= 0) return;
    setStore([...store, data]);
  };
  return (
    <Label>
      <Button>+</Button>
      <input type="file" accept="application/pdf" onChange={handleChange} />
    </Label>
  );
};

export default AddTicket;
