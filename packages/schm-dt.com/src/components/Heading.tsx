import React from 'react'
import styled from 'styled-components'

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  size?: number
}

const Component = styled.h1`
  pointer-events: none;
  font-size: ${({ size }: HeadingProps) => size ?? 72}px;
  position: relative;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 0.2em;
  @media screen and (max-width: 660px) {
    font-size: ${({ size }: HeadingProps) => (size ? size * 0.9 : 38)}px;
  }
`

export const Heading: React.FC<HeadingProps> = ({ size, children, ...rest }) => (
  <Component size={size} {...rest}>
    {children}
  </Component>
)
