import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import { Input, Button, Control, Field } from 'reactbulma'
import {connect} from 'react-redux';
import { addCardLoadBooks } from '../actions'

class CardForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    var card = {};
    data.forEach(function(value, key){
        card[key] = value;
    });

    if (card === {}) {
      return;
    }
    this.props.addCardLoadBooks(card);
    document.getElementById("add-card-form").reset();
  }

render() {
  return (
    <div>
    <h3 className="title is-3">Cards</h3>
    <p>Add a new card here !</p>
    <form id="add-card-form" onSubmit={this.handleSubmit}>
      <Field grouped>
        <Control>
          <Input id="code" name="code" placeholder="Card Number" type="text" />
        </Control>
        <Control>
          <Input id="pin" name="pin" placeholder="Code" type="password" />
        </Control>
      </Field>
      <Field>
        <Control>
          <Button type="submit">Save new Card</Button>
        </Control>
      </Field>
    </form>
  </div>
  );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({addCard: addCard}, dispatch);
// }

const mapDispatchToProps = (dispatch) => {
    return {
        addCardLoadBooks: (card) => dispatch(addCardLoadBooks(card))
    };
};

export default connect(null, mapDispatchToProps)(CardForm);
