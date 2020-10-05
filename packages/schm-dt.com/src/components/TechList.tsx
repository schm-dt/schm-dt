import React from 'react'
import styled from 'styled-components'

const Component = styled.ul`
  display: block;
`

const ListItem = styled.li`
  display: inline-block;
  padding: 0.5em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  background: rgba(255, 255, 255, 0.075);
  border-radius: 6px;
`

type TechListProps = {
  tech: string[]
}

export const TechList = ({ tech, ...rest }: TechListProps) => (
  <Component {...rest}>
    {tech.map(n => (
      <ListItem key={n}>{n}</ListItem>
    ))}
  </Component>
)
