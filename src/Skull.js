import React, { Component } from 'react'
import styled from 'styled-components'

import * as THREE from 'three'
import * as OBJLoader from 'three-obj-loader'

import { smoothMouse, smoothOrientation } from './lib'
import { skullMaterial } from './materials'

OBJLoader(THREE)

class Skull extends Component {
    constructor (props) {
        super(props)
        this.canvas = React.createRef()
        this.THREE = THREE

        this.camera = null
        this.scene = null
        this.renderer = null

        this.skull = null
        this.pointLight1 = null
        this.pointLight2 = null
        this.pointLight3 = null
    }
    init () {
        const loader = new this.THREE.OBJLoader()
    
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 )
        this.camera.position.y = 400
        this.scene = new THREE.Scene()
        this.scene.background = 0x020204
        this.scene.add(this.camera)
    
        const boxGeo = new THREE.BoxGeometry(500, 0, 100)
        const box = new THREE.Mesh( boxGeo, skullMaterial )
        box.position.x = 0
        box.position.y = 0  
        box.position.z = 0
    
        this.scene.add(box)
        
        loader.load('/obj/3.obj', object => {
          this.skull = object
          this.skull.children[0].material = skullMaterial
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
        this.pointLight1 = new THREE.PointLight( 0xFF0000, 15 )
        this.pointLight1.position.set( 150, 120, 150 )
        
        this.pointLight2 = new THREE.PointLight( 0x0000FF, 12 )
        this.pointLight2.position.set( -150, 50, 150 )
    
        this.pointLight3 = new THREE.PointLight( 0xffffff, 10 )
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
        this.canvas.current.appendChild( this.renderer.domElement )
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
          if (this.props.isTouchDevice) {
            this.skull.rotation.y = -smoothOrientation(this.props.orientation).gamma * 0.01744444444
            this.skull.rotation.x = -smoothOrientation(this.props.orientation).beta * 0.01744444444 * 0.5 -1
          } else {
            this.skull.rotation.y = smoothMouse(this.props.mouse).x
            this.skull.rotation.x = -smoothMouse(this.props.mouse).y - 1
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
    render () {
        const { className } = this.props
        return (
            <div className={ className }>
                <div className="canvas-wrapper">
                    <div ref={this.canvas}></div>
                </div>
            </div>
        )
    }
}

export default styled(Skull)`
/deep/ canvas {
  transition: all 1s;
  filter: blur(${props => props.scrolled ? '20px' : '0px'});
}
`