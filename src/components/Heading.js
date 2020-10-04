import React from "react";
import styled from "styled-components";

const Component = styled(({ size, ...restProps }) => <div {...restProps} />)`
  font-size: ${({ size }) => (size ? size : 72)}px;
  position: relative;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 0.2em;
  @media screen and (max-width: 660px) {
    font-size: ${({ size }) => (size ? size * 0.9 : 38)}px;
  }
`;

const Heading1 = styled.h1`
  pointer-events: none;
  font-size: 1em;
`;

export default ({ children, className, size }) => (
  <Component size={size} className={className}>
    <Heading1>{children}</Heading1>
  </Component>
);
