import React from "react";
import styled from "styled-components";
import Heading from "./Heading";
import Container from "./Container";

const Component = styled(Container)`
  padding-top: 20vh;
  padding-bottom: 20vh;
  @media screen and (max-width: 600px) {
    padding-top: 15vh;
    padding-bottom: 15vh;
  }
  @media screen and (min-width: 601px) {
    padding-top: 30vh;
    padding-bottom: 30vh;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  p {
    font-size: 18px;
    line-height: 1.7;
    margin-bottom: 1em;
    @media screen and (max-width: 960px) {
      font-size: 16px;
    }
  }
`;

const Role = styled.span`
  text-transform: uppercase;
  font-weight: 400;
  font-size: 24px;
  letter-spacing: 0.35em;
  margin-top: 1em;
  display: block;
  margin-bottom: 2rem;
  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

const Intro = styled.div`
  width: calc(100% + 40px);
  margin-left: -20px;
  margin-right: -20px;
  p {
    margin: 0 20px 20px;
    max-width: 30em;
  }
`;

export default ({ ...restProps }) => (
  <Component {...restProps}>
    <div>
      <Heading>Michael Schmidt</Heading>
      <Role>Developer</Role>
      <Intro>
        <p>
          I am a Brisbane-based developer with a passion for building
          cloud-based web&nbsp;applications.
        </p>
      </Intro>
    </div>
  </Component>
);
