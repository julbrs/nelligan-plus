import React, { Component } from 'react';
import Media from 'react-bulma-components/lib/components/media';
import Content from 'react-bulma-components/lib/components/content';
import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCard} from '../actions'

class CardList extends Component {

  handleDeleteCard(e) {
    e.preventDefault();
  }

  isError(item) {
    return (item.err !== undefined)?"error":""
  }

  render() {
    return (
      <div>
      {
        this.props.cards &&
        this.props.cards.map((item, key) =>
          // eslint-disable-next-line
          <Box key={item.code} className={this.isError(item)}>
            <Media>
              <Media.Item>
                <Content>
                  {item.name} <i>({item.code})</i> <strong>{item.err}</strong>
                </Content>
              </Media.Item>
              <Button remove onClick={() => this.props.deleteCard(key)} id={item.code}/>
            </Media>
          </Box>
      )
      }
    </div>
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
