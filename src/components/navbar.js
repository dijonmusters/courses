import React, { useState } from 'react';
import styled from 'styled-components';
import netlifyIdentity from 'netlify-identity-widget';
import { Link } from 'gatsby';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 1rem;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
`;

const Item = styled.li`
  margin: 0 1rem;
  position: relative;
`;

const Holder = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  opacity: ${props => (props.isVisible ? '1' : '0')};
  will-change: opacity;
`;

const Content = styled.div`
  width: 300px;
  height: 200px;
  background: white;
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
  transform-origin: left top;
  will-change: transform;
  transform: ${props => {
    return (
      props.dimensions &&
      props.dimensions.left &&
      props.dimensions.scaleX &&
      props.dimensions.scaleY &&
      `translate(${props.dimensions.left}px) scale(${props.dimensions.scaleX}, ${props.dimensions.scaleY})`
    );
  }};
  transition: ${props => (props.isVisible ? '0.3s' : '0.1s')};
`;

const Panel = styled.ul`
  list-style: none;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 1rem 0 1rem;
  visibility: hidden;
  opacity: 0;
  transition: 0.2s;
  width: ${props => (props.wide ? '30rem' : '20rem')};
  li {
    color: #555;
    padding: 1rem 0 0.5rem 0;
    margin: 0;
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #555;
  }
  p {
    font-size: 0.75rem;
    margin: 0;
  }
  &.is-visible {
    visibility: visible;
    opacity: 1;
    transition: 0.6s;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-bottom-color: white;
    margin: 0;
    padding: 0;
  }
`;

const Logo = styled.h1`
  font-family: 'Yantramanav';
  font-size: 1.25rem;
  margin: 0;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
  padding: 0.125rem 1rem;
  &:hover {
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
  }
  transition: 0.5s;
`;

const StyledLink = styled(Link)`
  border-bottom: 1px solid transparent;
  text-decoration: none;
  color: inherit;
`;

const hide = (e, setIsVisible) => {
  const panel = e.currentTarget.querySelector('ul');
  panel.classList.remove('is-visible');
  setIsVisible(false);
};

const reveal = (e, setIsVisible, setDimensions) => {
  const defaultDimensions = { width: 300, height: 200 };
  const panel = e.currentTarget.querySelector('ul');
  const panelRect = panel.getBoundingClientRect();
  const scaleX = panelRect.width / defaultDimensions.width;
  const scaleY = panelRect.height / defaultDimensions.height;
  const { left } = panelRect;
  setDimensions({
    scaleX,
    scaleY,
    left,
  });
  panel.classList.add('is-visible');
  setIsVisible(true);
};

const handleLogin = () => {
  netlifyIdentity.open();
};

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dimensions, setDimensions] = useState({});
  return (
    <Nav>
      <Holder isVisible={isVisible}>
        <Content dimensions={dimensions} isVisible={isVisible}></Content>
      </Holder>
      <Menu>
        <Item>
          <StyledLink to="/">
            <Logo>JSU</Logo>
          </StyledLink>
        </Item>
        <Item
          onMouseEnter={e => reveal(e, setIsVisible, setDimensions)}
          onMouseLeave={e => hide(e, setIsVisible)}
        >
          <StyledLink to="/courses">Courses</StyledLink>
          <Panel wide>
            <li>
              <StyledLink to="/">
                <h2>Intro</h2>
                <p>This is where you can go through some basics</p>
              </StyledLink>
            </li>
            <li>
              <h2>Complex</h2>
              <p>This is where you can go through some complex concepts</p>
            </li>
          </Panel>
        </Item>
        <Item
          onMouseEnter={e => reveal(e, setIsVisible, setDimensions)}
          onMouseLeave={e => hide(e, setIsVisible)}
        >
          <StyledLink to="/blogs">Blog</StyledLink>
          <Panel>
            <li>
              <h2>Intro</h2>
              <p>This is where you can go through some basics</p>
            </li>
            <li>
              <h2>More Complex</h2>
              <p>
                This is whesd gds dgsd gds gd sg ds gsd sgddgs gds dgsdg re you
                can go through some complex concepts
              </p>
            </li>
            <li>
              <h2>Intro</h2>
              <p>This is where you can go through some basics</p>
            </li>
            <li>
              <h2>More Complex</h2>
              <p>
                This is whesd gds dgsd gds gd sg ds gsd sgddgs gds dgsdg re you
                can go through some complex concepts
              </p>
            </li>
          </Panel>
        </Item>
        <Item>
          <StyledLink to="/support">Support Educator</StyledLink>
        </Item>
        <Item onClick={handleLogin}>Login</Item>
      </Menu>
    </Nav>
  );
};

export default Navbar;
