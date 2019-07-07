import React from 'react'
import styled from 'styled-components'

export default styled(({ className, children }) => <div className={ className }>{ children }</div>)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 1100px;
  width: 100%;
`