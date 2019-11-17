import React from 'react';
import 'bulma/css/bulma.css';
import './App.css'
import 'font-awesome/css/font-awesome.css';
import Header from './components/header'
import Footer from './components/footer'
import Cards from './components/cards'
import BookList from './components/book-list'
import { Section, Container, Content } from 'react-bulma-components/full';

const App = () => {
  return (
    <div>
      <Header />
      <Container>
        <Cards />
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
    </div>
  );
}

export default App;
