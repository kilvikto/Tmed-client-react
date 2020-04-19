import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


export const BaseLink = styled(NavLink)`

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;