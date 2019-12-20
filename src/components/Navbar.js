import React from 'react';
import styled from 'styled-components';
import AddTicket from './AddTicket';

const Nav = styled.nav`
  height: 3.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5em;
  flex-shrink: 0;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 1.25em;
`;

const Navbar = () => (
  <Nav>
    <Title>Hello.</Title>
    <AddTicket />
  </Nav>
);

export default Navbar;
