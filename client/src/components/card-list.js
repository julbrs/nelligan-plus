import React, { Component } from 'react';
import Media from 'react-bulma-components/lib/components/media';
import Content from 'react-bulma-components/lib/components/content';
import Button from 'react-bulma-components/lib/components/button';
import Card from 'react-bulma-components/lib/components/card';
import Heading from 'react-bulma-components/lib/components/heading';
import Columns from 'react-bulma-components/lib/components/columns';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCard} from '../actions'

class CardList extends Component {

  handleDeleteCard(e) {
    e.preventDefault();
  }

  cardClass(item) {
    if(item.err !== undefined) {
      return "card error"
    }
    else if (item.fine !== undefined) {
      return "card warning"
    }
    return "card"
  }

  render() {
    return (
      <Columns>
      {
        this.props.cards &&
        this.props.cards.map((item, key) =>
          // eslint-disable-next-line
          <Columns.Column size={3} key={item.code}>
            <Card className={this.cardClass(item)}>
              <Card.Content>
                <Media>
                  <Media.Item>
                    <Heading size={4}>{item.name}</Heading>
                    <Heading subtitle size={6}>
                      {item.code}
                    </Heading>
                  </Media.Item>
                  <Media.Item renderAs="figure" position="right">
                    <Button remove onClick={() => this.props.deleteCard(key)} id={item.code}/>
                  </Media.Item>
                </Media>
                <Content>
                  <strong>{item.err}</strong><br />
                  <em>{item.fine}</em>
                </Content>
              </Card.Content>
            </Card>
          </Columns.Column>
      )
      }
    </Columns>
    );
    }
  }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({deleteCard: deleteCard}, dispatch);
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
