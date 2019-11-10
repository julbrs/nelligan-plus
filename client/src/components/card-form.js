import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import Box from 'react-bulma-components/lib/components/box';


import {
  Field,
  Control,
} from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import {connect} from 'react-redux';
import { addCardLoadBooks } from '../actions'

class CardForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.name = React.createRef();
    this.code = React.createRef();
    this.pin = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    var card = {
      name: this.name.current.value,
      code: this.code.current.value,
      pin: this.pin.current.value
    };
    if (card.code === undefined) {
      return;
    }
    this.props.addCardLoadBooks(card);
    document.getElementById("add-card-form").reset();
  }

render() {
  return (
    <Box>
    <form id="add-card-form" onSubmit={this.handleSubmit}>
      <Field horizontal>
        <Control>
          <input className="input" placeholder="Nom" type="text" ref={this.name}/>
        </Control>
        <Control>
          <input className="input" placeholder="Code carte" type="text" ref={this.code} />
        </Control>
        <Control>
          <input className="input" placeholder="Pin" type="password" ref={this.pin} />
        </Control>
        <Control>
          <Button type="submit">Ajouter!</Button>
        </Control>
      </Field>
    </form>
  </Box>
  );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCardLoadBooks: (card) => dispatch(addCardLoadBooks(card))
    };
};

export default connect(null, mapDispatchToProps)(CardForm);
