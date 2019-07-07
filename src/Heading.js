import React from 'react'
import styled from 'styled-components'
import { white } from './colors'

let Heading = ({ children, className, size }) => {
    return (
        <div style={{ fontSize: size }} className={ className }>
            <h1>{ children }</h1>
        </div>
    )
}


export default styled(Heading)`
    position: relative;
    color: ${white};
    font-size: 2rem;
    font-weight: bold;
    display: inline-block;
    font-size: 72px;
    user-select: none;
    margin-bottom: 0.2em;
    @media screen and (max-width: 1020px) {
        font-size: 64px;
    }
    @media screen and (max-width: 960px) {
        font-size: 52px;
    }
    @media screen and (max-width: 660px) {
        font-size: 38px;
    }
    @keyframes wipe {
        from {
            right: 100%;
        }
        to {
            right: -0.3em;
        }
    }
    h1 {
        pointer-events: none;
        font-size: 1em;
    }
`
