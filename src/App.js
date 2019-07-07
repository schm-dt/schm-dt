import React, { Component } from 'react'
import styled from 'styled-components'
import * as THREE from 'three'
import * as OBJLoader from 'three-obj-loader'

import Intro from './Intro'
import Experiences from './Experiences'

import { white } from './colors'
OBJLoader(THREE);


function is_touch_device() {
  let prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  let mq = function(query) {
    return window.matchMedia(query).matches;
  }
  if ('ontouchstart' in window) {
    return true
  }
  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  let query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

const smoothingThreshold = 20

const material = new THREE.MeshPhysicalMaterial({
  map: null,
  color: 0x0D0B16,
  metalness: 0.2,
  roughness: 0,
  opacity: 1,
  side: THREE.FrontSide,
  transparent: false,
  reflectivity: 1,
  premultipliedAlpha: true,
})

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
      isTouchDevice: is_touch_device()
    }
    this.THREE = THREE
    this.canvas = React.createRef()
    this.cursor = React.createRef()

    this.camera = null
    this.scene = null
    this.renderer = null

    this.butterfly = null
    this.skull = null
    this.pointLight1 = null
    this.pointLight2 = null
    this.pointLight3 = null
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
    this.setState({
      orientation
    })
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
    this.setState({
      mouse
    })
  }
  smoothMouse () {
    let sum = this.state.mouse.reduce((acc, cur) => {
      return {
        x: acc.x + cur.x,
        y: acc.y + cur.y
      }
    }, {
      x: 0,
      y: 0
    })
    return {
      x: sum.x / (this.state.mouse.length || 1),
      y: sum.y / (this.state.mouse.length || 1)
    }
  }
  smoothOrientation () {
    let sum = this.state.orientation.reduce((acc, cur) => {
      return { 
        alpha: acc.alpha + cur.alpha,
        beta: acc.beta + cur.beta,
        gamma: acc.gamma +  cur.gamma
      }}, {
        alpha: 0,
        beta: 0,
        gamma: 0
      })
    return {
      alpha: sum.alpha / (this.state.orientation.length || 1),
      beta: sum.beta / (this.state.orientation.length || 1),
      gamma: sum.gamma / (this.state.orientation.length || 1)
    }
  }
  init () {
    window.addEventListener('deviceorientation', e => {
      this.onOrientation(e)
    })
    window.addEventListener('mousemove', e => {
      this.onMouseMove(e)
    })
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 )
    this.camera.position.y = 400
    this.scene = new THREE.Scene()
    this.scene.background = 0x020204
    this.scene.add(this.camera)

    const loader = new this.THREE.OBJLoader()

    const boxGeo = new THREE.BoxGeometry(500, 0, 100)
    const box = new THREE.Mesh( boxGeo, material )
    box.position.x = 0
    box.position.y = 0  
    box.position.z = 0
    
    this.scene.add(box)

    loader.load('/obj/3.obj', ( object ) => {
      this.skull = object
      this.skull.children[0].material = material   
      this.skull.position.z = -20
      this.setSkullSize()   
      this.scene.add(this.skull)
      this.skull.lookAt(this.camera.position)
    }, null,
    e => {
      // console.error( 'An error happened' )
    })

    this.addLights()
    this.initialiseRenderer()

    window.addEventListener('resize', () => {
      this.setSkullSize()
      if (window.innerWidth > 600) {
        this.updateRenderer()
      }
    })
  }
  addLights () {
    this.pointLight1 = new THREE.PointLight( 0xFF0000, 8 )
    this.pointLight1.position.set( 150, 120, 150 )
    
    this.pointLight2 = new THREE.PointLight( 0x0000FF, 5 )
    this.pointLight2.position.set( -150, 50, 150 )

    this.pointLight3 = new THREE.PointLight( 0xffffff, 1 )
    this.pointLight3.position.set( 0, -150, 0 )

    this.scene.add( this.pointLight1 )
    this.scene.add( this.pointLight2 )
    this.scene.add( this.pointLight3 )
  }
  initialiseRenderer () {
    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } )
    this.renderer.setClearColor( 0xffffff, 0)
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( this.renderer.domElement )
  }
  updateRenderer () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
  }
  setSkullSize () {
    if (window.innerWidth > 1000) {
      this.skull.children[0].scale.set(1.4, 1.4, 1.4)
    } else {
      this.skull.children[0].scale.set(1, 1, 1)
    }
  }
  animate () {
    const timer = Date.now() / 1000
    const lightRingRadius = 400

    if (this.skull) {
      if (this.state.isTouchDevice) {
        this.skull.rotation.y = -this.smoothOrientation().gamma * 0.01744444444
        this.skull.rotation.x = -this.smoothOrientation().beta * 0.01744444444 * 0.5 -1
      } else {
        this.skull.rotation.y = this.smoothMouse().x
        this.skull.rotation.x = -this.smoothMouse().y - 1
      }
    }

    this.pointLight1.position.x = Math.cos(timer) * lightRingRadius
    this.pointLight1.position.z = Math.sin(timer) * lightRingRadius
    
    this.pointLight2.position.x = Math.sin(timer) * lightRingRadius
    this.pointLight2.position.z = Math.cos(timer) * lightRingRadius

    this.camera.lookAt( this.scene.position )
    this.renderer.render( this.scene, this.camera )
    requestAnimationFrame( this.animate.bind(this) )
  }
  componentDidMount() {
    this.init()
    this.animate()
  }
  cursorStyle () {
    const cursorSize = 6
    return {
      transform: `translate(${window.innerWidth * this.smoothMouse().x - cursorSize / 2}px, ${window.innerHeight / 2 + window.innerHeight * -this.smoothMouse().y - cursorSize / 2}px)`,
      height: cursorSize,
      width: cursorSize,
      borderRadius: '50%',
      background: 'white',
      position: 'fixed',
      top: '50%',
      left: '50%',
      zIndex: 100
    }
  }
  render () {
    const { className } = this.props
    return (
      <div className={ className }>
        <div className="canvas-wrapper">
          <div ref={this.canvas}></div>
        </div>
        <Intro />
        <Experiences />
        {!this.state.isTouchDevice ? (<div className="cursor" ref={this.cursor} style={this.cursorStyle()}></div>) : false}
      </div>
    )
  }
}

export default styled(App)`
  color: ${white};
  padding: 0 6rem 20vh;
  @media screen and (max-width: 600px) {
    padding: 0 2.5rem 20vh;
  }
  p {
    font-size: 18px;
    line-height: 1.7;
    @media screen and (max-width: 960px) {
      font-size: 16px;
    }
  }
`
