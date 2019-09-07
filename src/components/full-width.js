import React from 'react';
import styled from 'styled-components';

const Red = styled.div`
  background-color: transparent;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const FullWidth = props => {
  return <Red>{props.children}</Red>;
};

export default FullWidth;
