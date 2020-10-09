import React from 'react'
import Hero from 'react-bulma-components/lib/components/hero'
import Container from 'react-bulma-components/lib/components/container'
import Heading from 'react-bulma-components/lib/components/heading'


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
