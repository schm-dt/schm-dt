import React from 'react'
import styled from 'styled-components'
import Heading from './Heading'
import Container from './Container'

export default styled(({ className }) => {
    return (
      <Container className={ className }>
        <div>
          <div>
            <Heading>Michael Schmidt</Heading>
          </div>
          <span className="role">Developer</span>
          <div className="intro">
            <p>I am a Brisbane-based developer with a passion for building cloud-based web&nbsp;applications.</p>
          </div>
          
        </div>
      </Container>
    )
  })`
  padding-top: 27vh;
  padding-bottom: 10rem;
  @media screen and (max-width: 1600px) {
    min-height: 100vh;
  }
  @media screen and (max-width: 600px) {
    padding-top: 20vh;
  }
  .role {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 24px;
    letter-spacing: 0.35em;
    margin-top: 1em;
    display: block;
    margin-bottom: 2rem;
    @media screen and (max-width: 600px) {
      font-size: 18px;
    }
  }
  .intro {
    width: calc(100% + 40px);
    margin-left: -20px;
    margin-right: -20px;
    p {
      margin: 0 20px 20px;
      max-width: 30em;
    }
  }
  `