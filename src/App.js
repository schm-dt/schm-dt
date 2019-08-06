import React, { Component } from 'react'
import styled from 'styled-components'
import throttle from 'lodash.throttle'

import Intro from './Intro'
import Experiences from './Experiences'

import { white } from './colors'

import { isTouchDevice } from './lib'

import Skull from './Skull'
import Portfolio from './Portfolio'
const smoothingThreshold = 10

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mouse: [{
        x: 0.5,
        y: 0.5
      }],
      orientation: [{
        alpha: 0,
        beta: 0,
        gamma: 0
      }],
      scroll: [
        0
      ],
      isTouchDevice: isTouchDevice(),
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }
    this.cursor = React.createRef()
  }
  onOrientation (e) {
    let orientation = [...this.state.orientation]
    if (orientation.length >= smoothingThreshold) {
      orientation.shift()
    }
    orientation.push({
      alpha: e.alpha,
      beta: e.beta,
      gamma: e.gamma,
    })
    this.setState({ orientation })
  }
  onMouseMove (e) {
    let mouse = [...this.state.mouse]
    if (mouse.length >= smoothingThreshold) {
      mouse.shift()
    }
    mouse.push({
      x: e.clientX / window.innerWidth - 0.5,
      y: 1 - e.clientY / window.innerHeight
    })
    this.setState({ mouse })
  }
  onScroll () {
    const scroll = [...this.state.scroll]
    if (scroll.length >= smoothingThreshold) {
      scroll.shift()
    }
    scroll.push(window.scrollY)
    this.setState({scroll})
  }
  
  cursorStyle () {
    let lastmouse = this.state.mouse[this.state.mouse.length - 1]
    const cursorSize = 6
    return {
      transform: `translate(${window.innerWidth * lastmouse.x - cursorSize / 2}px, ${window.innerHeight / 2 + window.innerHeight * -lastmouse.y - cursorSize / 2}px)`,
      height: cursorSize,
      width: cursorSize,
      borderRadius: '50%',
      background: 'white',
      position: 'fixed',
      top: '50%',
      left: '50%',
      zIndex: 100,
      pointerEvents: 'none'
    }
  }
  updateWindowSize () {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  }
  componentDidMount () {
    window.addEventListener('resize', throttle(this.updateWindowSize.bind(this), 100))
    window.addEventListener('deviceorientation', throttle(e => this.onOrientation(e), 30))
    window.addEventListener('mousemove', throttle(e => this.onMouseMove(e), 30))
    window.addEventListener('scroll', throttle(e => this.onScroll(), 200))
    this.onScroll()
  }
  scrolled () {
    return this.state.scroll[this.state.scroll.length - 1] > 50
  }
  render () {
    const { className } = this.props
    return (
      <div className={ className }>
        <Skull
          scrolled={this.scrolled()}
          isTouchDevice={this.state.isTouchDevice}
          orientation={this.state.orientation}
          mouse={this.state.mouse} />
        <Intro />
        <Portfolio
          scrolled={this.scrolled()}
          isTouchDevice={this.state.isTouchDevice}
          orientation={this.state.orientation}
          mouse={this.state.mouse} />
        <Experiences />
        {!this.state.isTouchDevice ? (<div className="cursor" ref={this.cursor} style={this.cursorStyle()}></div>) : false}
      </div>
    )
  }
}

export default styled(App)`
  color: ${white};

  p {
    font-size: 18px;
    line-height: 1.7;
    margin-bottom: 1em;
    @media screen and (max-width: 960px) {
        font-size: 16px;
    }
  }
  /deep/ h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5em;
    line-height: 1.5;
    @media screen and (max-width: 600px){
      font-size: 1.2rem;
    }
  }
  /deep/ b {
    font-weight: bold;
  }
`
