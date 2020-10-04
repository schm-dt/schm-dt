import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { TechList } from "../TechList";
import Devices from "../Devices";
import Container from "./Container";

const MT_TECH = ["React", "AWS Lambda", "AWS CloudFront", "AWS s3"];

const StyledTechList = styled(TechList)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Portfolio = (props) => {
  const portfolioItem = useRef(null);
  const observer = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const onIntersect = (entries, observer) => {
    if (entries[0]) {
      setIsVisible(entries[0].isIntersecting);
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(onIntersect);
    observer.current.observe(portfolioItem.current);
  }, []);

  const { className, scrolled, isTouchDevice, orientation, mouse } = props;

  return (
    <div className={className} ref={portfolioItem}>
      <Devices
        className="device"
        scrolled={scrolled}
        isTouchDevice={isTouchDevice}
        orientation={orientation}
        isVisible={isVisible}
        mouse={mouse}
      />
      <Container>
        <div className="portfolio-item">
          <h3>M+T</h3>
          <StyledTechList className="tech-list" tech={MT_TECH} />
          <p>
            A valentines inspired project that uses an NFC-enabled, miniature
            'message in a bottle' gift as 'key' to a web experience.
          </p>
          <p>
            Activating the NFC chip in the bottle with a phone, the user is
            taken to a single-page web experience (built in React) with a unique
            authorisation token provided by the NFC chip token in the bottle.
          </p>
          <p>
            Swiping the cork off the bottle triggers music playback and reveals
            a user-specific message that is fetched by hitting an AWS Lambda
            function with the NFC chip auth token.
          </p>
          <hr />
          <div className="credits">
            <h5>Project Credits</h5>
            <ul>
              <li>
                <b>Design:</b> Myself
              </li>
              <li>
                <b>Development:</b> Myself
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default styled(Portfolio)`
  position: relative;
  margin-top: 5rem;
  margin-bottom: 20rem;
  transition: opacity ${(props) => (props.scrolled ? "0.2s 0s" : "0.4s 0s")};
  opacity: ${(props) => (props.scrolled ? 1 : 0)};
  .portfolio-item {
    @media screen and (min-width: 960px) {
      max-width: 450px;
    }
    p {
      font-size: 14px;
    }
  }
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5em;
    line-height: 1.5;
    @media screen and (max-width: 600px) {
      font-size: 1.2rem;
    }
  }
  hr {
    display: block;
    height: 1px;
    border: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
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
`;
