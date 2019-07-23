import React, { Component } from 'react'
import styled from 'styled-components'
import loopvideo from './m+t.mp4'

import * as THREE from 'three'
import * as OBJLoader from 'three-obj-loader'

import { smoothOrientation, smoothMouse } from './lib'
import { videoMaterial } from './materials'

import { TweenLite, Back } from 'gsap/all'

OBJLoader(THREE)

class Devices extends Component {
    constructor (props) {
        super(props)
        this.canvas = React.createRef()
        this.loopvideo = React.createRef()

        this.THREE = THREE

        this.camera = null
        this.scene = null
        this.renderer = null

        this.pointLight1 = null
        this.pointLight2 = null
        this.pointLight3 = null
        this.pointLight4 = null

        this.loader = new this.THREE.OBJLoader()
    }
    componentDidUpdate (prevProps, prevState) {
        if (!prevProps.scrolled && this.props.scrolled) {
            this.showDevice()
        }
        if (prevProps.scrolled && !this.props.scrolled) {
            this.hideDevice()
        }
    }
    showDevice () {
        if (!this.device) {
            return false
        }
        TweenLite.to(this.device.position, 1, {z: 0, x: 0, y: 200, ease: Back.easeOut.config(1)  })
        this.device.traverse(node => {
            if ( node.material ) {
                TweenLite.to(node.material, 1, {opacity: 1, ease: Back.easeOut.config(1) })
            }
        })
    }
    hideDevice () {
        if (!this.device) {
            return false
        }
        TweenLite.to(this.device.position, 1, {z: 0, x: 200, y: -100})
        this.device.traverse(node => {
            if ( node.material ) {
                TweenLite.to(node.material, 0.25, {opacity: 0})
            }
        })
    }

    async init () {
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 )
        this.camera.position.y = 400
        this.scene = new THREE.Scene()
        this.scene.fog = new THREE.Fog(0x000000)
        this.scene.background = 0x020204
        this.scene.add(this.camera)
    
        this.loopvideo.current.play()

        let displayGeo = new THREE.PlaneGeometry( 2.4, 4.35, 1 )
        let display = new THREE.Mesh( displayGeo, videoMaterial(this.loopvideo.current) )
        
        this.screen = new THREE.Group()
        this.screen.add(display)
        this.screen.rotateX(-1.5708)
        this.screen.rotateY(0)
        this.screen.rotateZ(0)
        this.screen.position.set(0, 0.16, 0)

        // Group all devices using this 'focus' group
        let focus = new THREE.Group()
        this.focus = focus
        this.focus.position.x = 50
        this.scene.add(this.focus)

        this.addLights()
        await this.addDevice()

        this.initialiseRenderer()
    
        window.addEventListener('resize', () => {
          if (window.innerWidth > 600) {
            this.updateRenderer()
          }
        })
      }

      // Load in phone
      addDevice () {
        return new Promise((resolve, reject) => {
            this.loader.load('/obj/pixel.obj', object => {
                this.phone = object
                this.phone.position.y = 0
                this.phone.scale.set(1, 0.9, 1)
                this.phone.lookAt(this.camera.position)
    
                this.device = new THREE.Group()
                this.device.add(this.phone)
                this.device.add(this.screen)
                this.device.position.y = -50
                this.device.position.x = 300
                this.device.scale.set(20, 20, 20)
                this.device.traverse(node => {
                    if ( node.material ) {
                        node.material.opacity = 0
                        node.material.transparent = true
                    }
                })
    
                this.focus.add(this.device)
                if (this.props.scrolled) {
                    this.showDevice()
                } else {
                    this.hideDevice()
                }
                resolve()
            })
        })
      }

      // Load lights
      addLights () {
        this.pointLight1 = new THREE.PointLight( 0xFF0000,  )
        this.pointLight1.position.set( 150, 150, 150 )
        
        this.pointLight2 = new THREE.PointLight( 0x0000FF,  )
        this.pointLight2.position.set( -150, 50, 150 )
    
        this.pointLight3 = new THREE.PointLight( 0xffffff, 0.2 )
        this.pointLight3.position.set( 50, 200, 100 )

        this.pointLight4 = new THREE.PointLight( 0xffffff, 0.2 )
        this.pointLight4.position.set( -50, 200, -100 )    

        this.focus.add(this.pointLight1)
        this.focus.add(this.pointLight2)
        this.focus.add(this.pointLight3)
        this.focus.add(this.pointLight4)
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

        if (this.pointLight1) {
            this.pointLight1.position.x = Math.cos(timer) * lightRingRadius
            this.pointLight1.position.z = Math.sin(timer) * lightRingRadius
        }
    
        if (this.pointLight2) {
            this.pointLight2.position.x = Math.sin(timer) * lightRingRadius
            this.pointLight2.position.z = Math.cos(timer) * lightRingRadius
        }

        if (this.device) {
            if (this.props.isTouchDevice) {
                this.device.rotation.y = -smoothOrientation(this.props.orientation).gamma * 0.01744444444
                this.device.rotation.x = -smoothOrientation(this.props.orientation).beta * 0.01744444444 * 0.5 - 1
            } else {
                this.device.rotation.z = -smoothMouse(this.props.mouse).x * 0.5
                this.device.rotation.x = -smoothMouse(this.props.mouse).y * 0.5 + .2
            }
        }
        
        this.camera.lookAt( this.scene.position )
        this.renderer.render( this.scene, this.camera )
        requestAnimationFrame( this.animate.bind(this) )
      }
      async componentDidMount() {
        await this.init()
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

export default styled(Devices)`
video {
    position: fixed;
    top: 100%;
    height: 0;
    width: 0;
    left: 100%;
}
`