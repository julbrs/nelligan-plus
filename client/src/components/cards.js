import React, { Component } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Media from 'react-bulma-components/lib/components/media';
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
          <p>Add a new card here !</p>
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
          <Media>
            <Media.Item>
              <h3 className="title is-3">Cards</h3>
              {this.renderCards()}
            </Media.Item>
            <Media.Item renderAs="figure" position="right">
              <Button onClick={this.handleClick}>{this.state.show ? 'Hide' : 'Show'}</Button>
            </Media.Item>
          </Media>
        </Box>
      </Section>
    )
  }
}

export default Cards;