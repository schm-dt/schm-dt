import React from 'react'
import styled from 'styled-components'
import { Heading } from './Heading'
import { Container, ContainerProps } from './Container'

type IntroProps = ContainerProps

const Component = styled(Container)`
  padding-top: 20vh;
  padding-bottom: 20vh;
  position: relative;
  min-height: 100vh;
  @media screen and (max-width: 600px) {
    padding-top: 25vh;
    padding-bottom: 25vh;
  }
  @media screen and (min-width: 601px) {
    padding-top: 30vh;
    padding-bottom: 30vh;
    display: flex;
    align-items: center;
  }
  p {
    font-size: 18px;
    line-height: 1.7;
    margin-bottom: 1em;
    @media screen and (max-width: 960px) {
      font-size: 16px;
    }
  }
`

const Role = styled.span`
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
`

const LeadParagraph = styled.div`
  width: calc(100% + 40px);
  margin-left: -20px;
  margin-right: -20px;
  p {
    margin: 0 20px 20px;
    max-width: 30em;
  }
`

export const Intro = ({ ...rest }: IntroProps) => (
  <Component {...rest}>
    <div>
      <Heading>Michael Schmidt</Heading>
      <Role>Developer</Role>
      <LeadParagraph>
        <p>
          I am a Brisbane-based developer with a passion for building cloud-based
          web&nbsp;applications.
        </p>
      </LeadParagraph>
    </div>
  </Component>
)
