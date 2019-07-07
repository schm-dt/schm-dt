import React, { Component } from 'react'
import styled from 'styled-components'
import * as THREE from 'three'
import * as OBJLoader from 'three-obj-loader'

import Intro from './Intro'
import Experiences from './Experiences'

import { white } from './colors'
OBJLoader(THREE);


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mouse: {
        x: 0.5,
        y: 0.5
      },
      orientation: null
    }
    this.THREE = THREE
    this.canvas = React.createRef()
    this.cursor = React.createRef()
    this.camera = null
    this.scene = null
    this.renderer = null

    this.butterfly = null
    this.skull = null
    this.material = new THREE.MeshPhysicalMaterial({
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
    this.pointLight1 = null
    this.pointLight2 = null
    this.pointLight3 = null
  }
  onOrientation (e) {
    this.setState({
      orientation: {
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma,
      }
    })
  }
  onMouseMove (e) {
    this.setState({
      hasMouse: true,
      mouse: {
        x: e.clientX / window.innerWidth - 0.5,
        y: 1 - e.clientY / window.innerHeight
      }
    })
  }
  init () {
    window.addEventListener('deviceorientation', e => {
      this.onOrientation(e)
    })
    window.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 )
    this.camera.position.y = 400
    this.scene = new THREE.Scene()
    this.scene.background = 0x020204
    this.scene.add(this.camera)

    const loader = new this.THREE.OBJLoader()

    const boxGeo = new THREE.BoxGeometry(500, 0, 100)
    const box = new THREE.Mesh( boxGeo, this.material )
    box.position.x = 0
    box.position.y = 0  
    box.position.z = 0
    
    this.scene.add(box)

    loader.load('/obj/3.obj', ( object ) => {
      this.skull = object
      this.skull.children[0].material = this.material   
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
    let timer = Date.now() / 1000
    if (this.skull) {
      if (this.state.orientation !== null) {
        this.skull.rotation.y = -this.state.orientation.gamma * 0.01744444444
        this.skull.rotation.x = -this.state.orientation.beta * 0.01744444444 * 0.5 -1
      } else {
        this.skull.rotation.y = this.state.mouse.x
        this.skull.rotation.x = -this.state.mouse.y - 1
      }
    }
    let lightRingRadius = 400
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
    let cursorSize = 6
    return {
      transform: `translate(${window.innerWidth * this.state.mouse.x - cursorSize / 2}px, ${window.innerHeight / 2 + window.innerHeight * -this.state.mouse.y - cursorSize / 2}px)`,
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
        {this.state.hasMouse ? (<div className="cursor" ref={this.cursor} style={this.cursorStyle()}></div>) : false}
        
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
