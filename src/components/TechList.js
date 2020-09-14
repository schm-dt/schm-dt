import React from "react";
import styled from "styled-components";

const Component = styled.ul`
  display: block;
`;

const ListItem = styled.li`
  display: inline-block;
  padding: 0.5em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  background: rgba(255, 255, 255, 0.075);
  border-radius: 6px;
`;

export const TechList = ({ tech, ...restProps }) => (
  <Component {...restProps}>
    {tech.map((n, i) => (
      <ListItem key={i}>{n}</ListItem>
    ))}
  </Component>
);
