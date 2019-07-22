import React, { Component } from 'react'
import styled from 'styled-components'
import loopvideo from './m+t.mp4'

import * as THREE from 'three'
import * as OBJLoader from 'three-obj-loader'

import { smoothScroll, smoothOrientation, smoothMouse } from './lib'
import { glassMaterial, skullMaterial } from './materials'

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
        this.pointLight4 = null

        this.loopvideo = React.createRef()
    }
    init () {
        const loader = new this.THREE.OBJLoader()
    
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 )
        this.camera.position.y = 400
        this.scene = new THREE.Scene()
        this.scene.background = 0x020204
        this.scene.add(this.camera)
    
        this.loopvideo.current.play()
        let texture = new THREE.VideoTexture( this.loopvideo.current )
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter

    
        let displayMaterial = new THREE.MeshBasicMaterial( { map: texture, overdraw: false, side: THREE.FrontSide } )
        let displayGeo = new THREE.PlaneGeometry( 2.4, 4.35, 1 )
        let display = new THREE.Mesh( displayGeo, displayMaterial )
        this.scene.add(display)
    
        let glassThickness = 0.0001
        let glassGeometry = new THREE.BoxGeometry(2.4, 4.35, glassThickness)
        let glass = new THREE.Mesh(glassGeometry, glassMaterial)
        glass.position.set(0, 0, glassThickness);
    
        let screen = new THREE.Group()
        this.screen = screen
        // screen.add(glass)
        screen.add(display)
        screen.rotateX(-1.5708)
        screen.rotateY(0)
        screen.rotateZ(0)
        screen.position.set(0, 0.16, 0)

        // Load in phone
        loader.load('/obj/pixel.obj', object => {
          this.phone = object
          this.phone.position.y = 0
          this.phone.scale.set(1, 0.9, 1)
          this.phone.lookAt(this.camera.position)

          let device = new THREE.Group()
          this.device = device
          device.add(this.phone)
          device.add(this.screen)
          device.position.y = 200
          device.scale.set(20, 20, 20)
          this.scene.add(device)
        })

        this.addLights()
        this.initialiseRenderer()
    
        window.addEventListener('resize', () => {
          if (window.innerWidth > 600) {
            this.updateRenderer()
          }
        })
      }
      addLights () {
        this.pointLight1 = new THREE.PointLight( 0xFF0000,  )
        this.pointLight1.position.set( 150, 150, 150 )
        
        this.pointLight2 = new THREE.PointLight( 0x0000FF,  )
        this.pointLight2.position.set( -150, 50, 150 )
    
        this.pointLight3 = new THREE.PointLight( 0xffffff, 0.2 )
        this.pointLight3.position.set( 50, 200, 100 )

        this.pointLight4 = new THREE.PointLight( 0xffffff, 0.2 )
        this.pointLight4.position.set( -50, 200, -100 )    

        this.scene.add( this.pointLight1 )
        this.scene.add( this.pointLight2 )
        this.scene.add( this.pointLight3 )
        this.scene.add( this.pointLight4 )
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
      animate () {
        const timer = Date.now() / 1000
        const lightRingRadius = 400

    
        this.pointLight1.position.x = Math.cos(timer) * lightRingRadius
        this.pointLight1.position.z = Math.sin(timer) * lightRingRadius
    
        if (this.device) {
            if (this.props.isTouchDevice) {
                this.device.rotation.y = -smoothOrientation(this.props.orientation).gamma * 0.01744444444
                this.device.rotation.x = -smoothOrientation(this.props.orientation).beta * 0.01744444444 * 0.5 - 1
            } else {
                this.device.rotation.y = -smoothMouse(this.props.mouse).x * 0.5
                this.device.rotation.x = -smoothMouse(this.props.mouse).y * 0.5 + .2
            }
        }
        
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
                <video ref={this.loopvideo} src={loopvideo} loop={true} muted={true} autoPlay={true} />
            </div>
        )
    }
}

export default styled(Skull)`
video {
    position: fixed;
    top: 100%;
    height: 0;
    width: 0;
    left: 100%;
}
`