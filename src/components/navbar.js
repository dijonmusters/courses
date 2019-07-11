import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  /* background-color: red; */
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
  /* position: relative; */
`;

const Item = styled.li`
  margin: 0 1rem;
  position: relative;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Holder = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'}; */
  opacity: ${props => props.isVisible ? '1' : '0'};
  transition: 0.3s;
  will-change: opacity;
`;

const Content = styled.div`
  width: 300px;
  height: 200px;
  background: white;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.4);
  transform-origin: left top;
  will-change: transform;
  /* transform: translate(377.421875px) scale(0.7, 1.882734375); */
  transform: ${props => {
    // console.log(props);
    return props.dimensions
    && props.dimensions.left
    && props.dimensions.scaleX
    && props.dimensions.scaleY
    && `translate(${props.dimensions.left}px) scale(${props.dimensions.scaleX}, ${props.dimensions.scaleY})`
  }};
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
  transition: 0.3s;
  width: ${props => props.wide ? '30rem' : '20rem'};
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
  }
  &:before {
    /* TODO: NEED TO GET RID OF TOP BORDER */
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-bottom-color: #FFFFFF;
    margin: 0;
    padding: 0;
  }
`;

const hide = (e, setIsVisible) => {
  const panel = e.currentTarget.querySelector('ul');
  panel.classList.remove('is-visible');
  setIsVisible(false);
}

const reveal = (e, setIsVisible, setDimensions) => {
  const defaultDimensions = { width: 300, height: 200 };
  const panel = e.currentTarget.querySelector('ul');
  const panelRect = panel.getBoundingClientRect();
  console.log(panel)
  const scaleX = panelRect.width / defaultDimensions.width;
  const scaleY = panelRect.height / defaultDimensions.height;
  console.log(panelRect)
  const { left } = panelRect;
  setDimensions({
    scaleX,
    scaleY,
    left
  });
  panel.classList.add('is-visible');
  setIsVisible(true);
}

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dimensions, setDimensions] = useState({});
  return (
    <Nav>
      <Holder isVisible={isVisible}>
        <Content dimensions={dimensions}></Content>
      </Holder>
      <Menu>
        <Item
          onMouseEnter={e => reveal(e, setIsVisible, setDimensions)}
          onMouseLeave={e => hide(e, setIsVisible)}
        >
          <a href="#">Courses</a>
          <Panel wide>
            <li>
              <a href="#">
                <h2>Intro</h2>
                <p>This is where you can go through some basics</p>
              </a>
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
          <a href="#">Blog</a>
          <Panel>
            <li>
              <h2>Intro</h2>
              <p>This is where you can go through some basics</p>
            </li>
            <li>
              <h2>More Complex</h2>
              <p>This is whesd gds dgsd gds gd sg ds gsd  sgddgs gds dgsdg re you can go through some complex concepts</p>
            </li>
            <li>
              <h2>Intro</h2>
              <p>This is where you can go through some basics</p>
            </li>
            <li>
              <h2>More Complex</h2>
              <p>This is whesd gds dgsd gds gd sg ds gsd  sgddgs gds dgsdg re you can go through some complex concepts</p>
            </li>
          </Panel>
        </Item>
      </Menu>
    </Nav>
  );
}

export default Navbar;