import React from 'react'
import styled from 'styled-components'
import { Heading } from './Heading'
import { Container } from './Container'
import { TechList } from './TechList'

const NDIS_TECH = ['React.js', 'Redux', 'Typescript', 'PostgREST']

const ROMEO_TECH = [
  'AWS ECS',
  'AWS S3',
  'Docker',
  'Socket.io',
  'Electron',
  'Vue.js',
  'GraphQL',
  'Mongoose/MongoDB',
  'Node.js',
  'Gulp',
  'SASS/SCSS',
  'WordPress',
  'WooCommerce',
]

const MARGIN_TECH = ['Gulp', 'SASS/SCSS', 'ES6', 'WordPress', 'ACF', 'WooCommerce', 'cPanel']

const Component = styled.div`
  min-height: 100vh;
  align-items: center;
  display: flex;
  position: relative;
`

const ExperienceItems = styled.div`
  margin-top: 3rem;
`

const ExperienceItem = styled.div`
  margin-bottom: 5rem;
`

const ExperienceHeading = styled.h4`
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-weight: 600;
  margin: 2em 0 1em;
  display: block;
  line-height: 1.2;
  @media screen and (max-width: 600px) {
    font-size: 1.05rem;
  }
`

const ExperienceYears = styled.div`
  font-size: 1.125rem;
  font-weight: 400;
  margin-bottom: 1rem;
`

const TechnologiesHeading = styled.h4`
  margin-top: 1.5rem;
`

const StyledTechList = styled(TechList)`
  margin-top: 1rem;
`

export const Experiences = ({ ...rest }) => (
  <Component {...rest}>
    <Container>
      <Heading size={30}>Experience</Heading>
      <ExperienceItems>
        <ExperienceItem>
          <ExperienceHeading>NDIS — Front End Developer</ExperienceHeading>
          <ExperienceYears>September 2019 &ndash; Current</ExperienceYears>
          <TechnologiesHeading>Technologies Used</TechnologiesHeading>
          <StyledTechList tech={NDIS_TECH} />
        </ExperienceItem>
        <ExperienceItem>
          <ExperienceHeading>Romeo Digital — Front End Developer</ExperienceHeading>
          <ExperienceYears>July 2017 &ndash; September 2019</ExperienceYears>
          <TechnologiesHeading>Technologies Used</TechnologiesHeading>
          <StyledTechList tech={ROMEO_TECH} />
        </ExperienceItem>
        <ExperienceItem>
          <ExperienceHeading>QUT — Sessional Academic Tutor</ExperienceHeading>
          <ExperienceYears>January 2016 &ndash; July 2017</ExperienceYears>
        </ExperienceItem>
        <ExperienceItem>
          <ExperienceHeading>Margin Media — Lead Developer</ExperienceHeading>
          <ExperienceYears>July 2015 &ndash; June 2017</ExperienceYears>
          <TechnologiesHeading>Technologies Used</TechnologiesHeading>
          <StyledTechList tech={MARGIN_TECH} />
        </ExperienceItem>
      </ExperienceItems>
    </Container>
  </Component>
)
