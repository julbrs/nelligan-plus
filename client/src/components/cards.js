import React, { Component } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Box from 'react-bulma-components/lib/components/box';
import CardForm from './card-form'
import CardList from './card-list'

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {show: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState((state) => ({
      show: !state.show}))
  }

  renderCards() {
    if(this.state.show) {
      return (
        <div>
        <p>Ajouter une nouvelle carte ici !</p>
        <CardForm />
        <CardList />
        </div>

      );
    }
  }

  render() {
    return (
      <Section>
        <Box>
        <h3 className="title is-3" onClick={this.handleClick}>Cartes <i className={this.state.show ? 'fa fa-eye-slash is-pulled-right' : 'fa fa-eye is-pulled-right'}/></h3>
          {this.renderCards()}
        </Box>
      </Section>
    )
  }
}

export default Cards;
