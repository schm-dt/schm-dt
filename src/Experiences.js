import React from 'react'
import styled from 'styled-components'
import Heading from './Heading'
import Container from './Container'
import { TechList } from './TechList' 

const romeoTech = [
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

const marginTech = [
  'Gulp',
  'SASS/SCSS',
  'ES6',
  'WordPress',
  'ACF',
  'WooCommerce',
  'cPanel',
]

export default styled(({ className }) => {
    return (
      <div className={ className }>
        <Container>
          <Heading size={30}>Experience</Heading>
          <div className="experience-items">
            <div className="experience-item">
              <h3>Romeo Digital — Front End Developer</h3>
              <span className="experience-item__years">July 2017 &ndash; Current</span>
              <p></p>
              <h4>Technologies Used</h4>
              <TechList tech={romeoTech} />
            </div>
            <div className="experience-item">
              <h3>QUT — Sessional Academic Tutor</h3>
              <span className="experience-item__years">January 2016 &ndash; July 2017</span>
              <p></p>
            </div>
            <div className="experience-item">
              <h3>Margin Media — Lead Developer</h3>
              <span className="experience-item__years">July 2015 &ndash; June 2017</span>
              <p></p>
              <h4>Technologies Used</h4>
              <TechList tech={marginTech} />
            </div>
          </div>
        </Container>
      </div>
    )
  })`
  .experience-items {
    margin-top: 3rem;
  }
  .experience-item {
    margin-bottom: 5rem;
  }
  .experience-item__years {
    color: #FBF1FF;
    font-size: 18px;
    font-weight: 300;

  }

  h4 {
    text-transform: uppercase;
    letter-spacing: 0.07em;
    font-weight: 600;
    margin: 2em 0 1em;
    display: block;
    @media screen and (max-width: 600px){
      font-size: 1.05rem;
    }
  }
  `