import React from 'react'
import styled from 'styled-components'

export const TechList = styled(props => (
    <ul className={props.className}>{ props.tech.map((n, i) => <li key={i}>{n}</li>) }</ul>
))`
ul {
    display: block;
    margin-left: -0.5em;
    max-width: 600px;
}
li {
    display: inline-block;
    padding: 0.5em;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    background: rgba(255,255,255, 0.075);
    border-radius: 6px;
}
`