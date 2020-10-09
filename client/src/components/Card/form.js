import React, {useContext} from 'react'
import { useInput } from './../../hooks/input'
import Box from 'react-bulma-components/lib/components/box'

import {
  Field,
  Control,
} from 'react-bulma-components/lib/components/form'
import Button from 'react-bulma-components/lib/components/button'

import {CardsContext} from './context'

const CardForm = () => {

  const { value:name, bind:bindName, reset:resetName } = useInput('');
  const { value:code, bind:bindCode, reset:resetCode } = useInput('');
  const { value:pin, bind:bindPin, reset:resetPin } = useInput('');
  const {cards, setCards} = useContext(CardsContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code === undefined) {
      return;
    }
    setCards([
      ...cards,
      {
        name,
        code,
        pin,
      }
    ])
    resetName()
    resetCode()
    resetPin()
  }

  return (
    <Box>
      <form id="add-card-form" onSubmit={handleSubmit}>
        <Field horizontal>
          <Control>
            <input className="input" placeholder="Nom" type="text" {...bindName}/>
          </Control>
          <Control>
            <input className="input" placeholder="Code carte" type="text" {...bindCode} />
          </Control>
          <Control>
            <input className="input" placeholder="Pin" type="password" {...bindPin} />
          </Control>
          <Control>
            <Button type="submit">Ajouter!</Button>
          </Control>
        </Field>
      </form>
    </Box>
  )
}

export default CardForm;
