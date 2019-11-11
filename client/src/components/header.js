import React from 'react';
import { Hero, Container, Heading } from 'react-bulma-components/full';

function Header() {

return (
  <Hero color="primary">
    <Hero.Body>
      <Container>
        <Heading>
          Nelligan+
        </Heading>
        <Heading subtitle size={4}>
          Gérer vos différentes cartes de la bibliothèque de Montréal en évitant les retards et les frais !
        </Heading>
      </Container>
    </Hero.Body>
  </Hero>
  )
}

export default (Header);
