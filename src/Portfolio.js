

import React, { Component } from 'react'
import styled from 'styled-components'

class Portfolio extends Component {
    constructor (props) {
        super(props)
        
    }
    componentDidMount() {


    }
    render () {
        const { className } = this.props
        return (
            <div className={ className }>

            </div>
        )
    }
}

export default styled(Portfolio)`
height: 300vh;
`