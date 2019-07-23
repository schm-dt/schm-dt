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
              <h3>Margin Media — Lead Developer</h3>
              <span className="experience-item__years">July 2015 &ndash; June 2017</span>
              <p></p>
              <h4>Technologies Used</h4>
              <ul>
                <li>Gulp</li>
                <li>SASS/SCSS</li>
                <li>ES6</li>
                <li>WordPress</li>
                <li>ACF</li>
                <li>WooCommerce</li>
                <li>cPanel</li>
              </ul>
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
    background: rgba(255,255,255, 0.025);
    border-radius: 6px;
  }
  `