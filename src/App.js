import React, { Component } from "react";
import throttle from "lodash.throttle";

import Intro from "./components/Intro";
import Experiences from "./components/Experiences";
import { isTouchDevice } from "./lib";
import Skull from "./components/Skull";

const smoothingThreshold = 10;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mouse: [
        {
          x: 0.5,
          y: 0.5,
        },
      ],
      orientation: [
        {
          alpha: 0,
          beta: 0,
          gamma: 0,
        },
      ],
      scroll: [0],
      isTouchDevice: isTouchDevice(),
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };
  }

  onOrientation(e) {
    const orientation = [...this.state.orientation];

    if (orientation.length >= smoothingThreshold) {
      orientation.shift();
    }

    orientation.push({
      alpha: e.alpha,
      beta: e.beta,
      gamma: e.gamma,
    });

    this.setState({ orientation });
  }

  onMouseMove(e) {
    const mouse = [...this.state.mouse];

    if (mouse.length >= smoothingThreshold) {
      mouse.shift();
    }

    mouse.push({
      x: e.clientX / window.innerWidth - 0.5,
      y: 1 - e.clientY / window.innerHeight,
    });

    this.setState({ mouse });
  }
  onScroll() {
    const scroll = [...this.state.scroll];

    if (scroll.length >= smoothingThreshold) {
      scroll.shift();
    }

    scroll.push(window.scrollY);

    this.setState({ scroll });
  }

  updateWindowSize() {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    });
  }

  componentDidMount() {
    window.addEventListener(
      "resize",
      throttle(this.updateWindowSize.bind(this), 100)
    );

    window.addEventListener(
      "deviceorientation",
      throttle((e) => this.onOrientation(e), 30)
    );

    window.addEventListener(
      "mousemove",
      throttle((e) => this.onMouseMove(e), 30)
    );

    window.addEventListener(
      "scroll",
      throttle((e) => this.onScroll(), 200)
    );

    this.onScroll();
  }

  scrolled() {
    return this.state.scroll[this.state.scroll.length - 1] > 50;
  }

  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        <Skull
          scrolled={this.scrolled()}
          isTouchDevice={this.state.isTouchDevice}
          orientation={this.state.orientation}
          mouse={this.state.mouse}
        />
        <Intro />
        <Experiences />
      </div>
    );
  }
}

export default App;
