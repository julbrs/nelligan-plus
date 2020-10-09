import React, {useState} from 'react'
import './App.css'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'
import Header from './header'
import Footer from './footer'
import {CardForm, CardList, CardsContextProvider} from '../Card'
import {BookList} from '../Book'

import Section from 'react-bulma-components/lib/components/section'
import Container from 'react-bulma-components/lib/components/container'
import Content from 'react-bulma-components/lib/components/content'
import Box from 'react-bulma-components/lib/components/box'

const App = () => {
  const [show, setShow] = useState(false);

  const handleClick = (event) => {
    setShow(!show)
  }

  const renderCards = () => {
    if(show) {
      return (
        <>
          <p>Ajouter une nouvelle carte ici !</p>
          <CardForm />
          <CardList />
        </>
      )
    }
  }

  return (
    <CardsContextProvider>
      <Header />
      <Container>
        <Section>
          <Box>
          <h3 className="title is-3" onClick={handleClick}>
            Cartes 
            <i className={show ? 'fa fa-eye-slash is-pulled-right' : 'fa fa-eye is-pulled-right'}/>
          </h3>
            {renderCards()}
          </Box>
        </Section>
        <Section>
          <BookList />
        </Section>
        <Section>
          <Content>
            <h3 className="title is-3">Comment utiliser cet outil ?</h3>
            <p>
              Ajoutez simplement vos cartes dans le panneau <i>Cartes</i>, elles seront
              sauvés sur ce navigateur. La liste des livres associés aux différentes
              cartes va ensuite s'afficher dans la section <i>Livres</i>, ordonnés par
              date de retour. Il est possible de prolonger un livre en cliquant sur la
              petite icone correspondante (<i title="Renouveller" className="fa fa-retweet"/>). Un message s'affichera pour vous informer
              de la bonne réussite de l'opération (ou d'une impossibilité si reservé ou autre).
            </p>
            <p>
              J'ai créé cet outil pour gérer les 5 cartes de la famille avec efficacité
              <span role="img" aria-label="image"> ⚙️👌</span>
            </p>
            <p>Cette application n'a aucun lien avec la ville de Montréal et le réseau
            de bibilothèques de la ville. Les identifications des cartes sont stockés
            uniquement dans le stockage local du navigateur. L'application utilise
            les identifications uniquement pour interagir directement avec le catalogue
            <a href="https://nelligan.ville.montreal.qc.ca"> Nelligan</a>.</p>
          </Content>
        </Section>
      </Container>
      <Footer />
    </CardsContextProvider>
  );
}

export default App;
