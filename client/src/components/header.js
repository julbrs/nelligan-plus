import React, { Component } from 'react';
import { Hero, Container, Heading } from 'react-bulma-components/full';

class Header extends Component {

render() {
  return (
    <Hero color="primary">
      <Hero.Body>
        <Container>
          <Heading>
            Nelligan+++
          </Heading>
          <Heading subtitle size={4}>
            Manage your mulltiple Nelligan accounts with a single application.
            All cards are stored in cache of your browser, a backend is present
            only to request for books information.
          </Heading>
        </Container>
      </Hero.Body>
    </Hero>
  );
  }
}

export default (Header);