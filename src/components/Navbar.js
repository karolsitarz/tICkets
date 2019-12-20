import React from 'react';
import styled from 'styled-components';
import AddTicket from './AddTicket';

const Nav = styled.nav`
  height: 3em;
  background-color: whitesmoke;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
`;

const Navbar = () => (
  <Nav>
    <span>test2</span>
    <AddTicket />
  </Nav>
);

export default Navbar;
