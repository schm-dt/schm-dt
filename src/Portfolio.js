import React, { Component } from 'react'
import styled from 'styled-components'
import { TechList } from './TechList'

const mtTech = ['React', 'AWS Lambda', 'AWS CloudFront', 'AWS s3']
class Portfolio extends Component {
    componentDidMount() {


    }
    render () {
        const { className } = this.props
        return (
            <div className={ className }>
                <div className="portfolio-item">
                    <h3>M+T</h3>
                    <TechList className="tech-list" tech={mtTech} />
                    <p>A valentines inspired project that uses an NFC-enabled, miniature 'message in a bottle' gift as 'key' to a web experience.</p>
                    <p>Activating the NFC chip in the bottle with a phone, the user is taken to a single-page web experience (built in React) with a unique authorisation token provided by the NFC chip token in the bottle.</p>
                    <p>Swiping the cork off the bottle triggers music playback and reveals a user-specific message that is fetched by hitting an AWS Lambda function with the NFC chip auth token.</p>
                    <hr />
                    <div className="credits">
                        <h5>Project Credits</h5>
                        <ul>
                            <li><b>Design:</b> Person</li>
                            <li><b>Other Developers:</b> Person</li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default styled(Portfolio)`
height: 300vh;
max-width: 1100px;
margin: auto;
.portfolio-item {
    max-width: 450px;
    transition: all 0.6s;
    ${props => !props.scrolled ? 'filter: blur(5px);' : ''}
    ${props => !props.scrolled ? 'opacity: 0;' : ''}
    p {
        font-size: 14px;
    }
}
.tech-list {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}
hr {
    display: block;
    height: 1px;
    border: 0;
    width: 100%;
    background: rgba(255,255,255, 0.1);
    margin: 1.5rem 0;
}
.credits {
    li {
        opacity: 0.5;
        font-size: 12px;
        margin-bottom: 0.25rem;
    }
    h5 {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
}
`