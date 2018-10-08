import React, { Component } from 'react';
import { Media, Delete } from 'reactbulma'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCard} from '../actions'

class CardList extends Component {

  handleDeleteCard(e) {
    e.preventDefault();
  }

render() {
  return (
    <div>
    {
      this.props.cards &&
      this.props.cards.map((item, key) =>
        // eslint-disable-next-line
        <Media key={item.code}>
          <Media.Content>
          {item.code}
        </Media.Content>

      <Media.Right>
        <Delete onClick={() => this.props.deleteCard(key)} id={item.code} />
      </Media.Right>
    </Media>
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
