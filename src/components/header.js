import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const StyledHeader = styled.header`
  padding: 1rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: inherit;
  margin-right: 1rem;
  border-bottom: 1px solid transparent;
  /* font-weight: 800; */
  font-family: 'Open Sans Light';
  font-size: 0.75rem;
  &:hover {
    border-bottom: 1px solid #eee;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-family: 'Yantramanav';
  font-size: 1.25rem;
  margin: 0;
  border-left: 1px solid white;
  border-right: 1px solid white;
  padding: 0.125rem 1rem;
`;

const Header = props => (
  <StyledHeader>
    <StyledNav>
        <StyledLink to="/">
      <Logo>
        JSU
      </Logo>
        </StyledLink>
      <StyledLink to="/courses">Courses</StyledLink>
      <StyledLink to="/blogs">Blog</StyledLink>
    </StyledNav>
  </StyledHeader>
);

export default Header;