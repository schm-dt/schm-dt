import React from "react";
import styled from "styled-components";

const Component = styled(({ size, ...restProps }) => <div {...restProps} />)`
  font-size: ${(props) => (props.size ? props.size : 72)}px;
  position: relative;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 0.2em;
  @media screen and (max-width: 660px) {
    font-size: 38px;
  }
  h1 {
    pointer-events: none;
    font-size: 1em;
  }
`;

export default ({ children, className, size }) => (
  <Component size={size} className={className}>
    <h1>{children}</h1>
  </Component>
);
