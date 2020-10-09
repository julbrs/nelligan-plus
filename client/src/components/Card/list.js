import React, { useContext } from 'react'
import Media from 'react-bulma-components/lib/components/media'
import Content from 'react-bulma-components/lib/components/content'
import Button from 'react-bulma-components/lib/components/button'
import Card from 'react-bulma-components/lib/components/card'
import Heading from 'react-bulma-components/lib/components/heading'
import Columns from 'react-bulma-components/lib/components/columns'

import {CardsContext} from './context'

const CardList = () => {
  // TODO call additional info (fine + err)
  // TODO handle if card in error
  let {cards, setCards} = useContext(CardsContext)

  const deleteCard = (code) => {
    setCards(cards.filter(card => card.code !== code))
  }
  
  const classCard = (item) => {
    if(item.err !== undefined) {
      return "card error"
    }
    else if (item.fine !== undefined) {
      return "card warning"
    }
    return "card"
  }
    
  const renderCard = (card) => {
    return (
      <Columns.Column size={3} key={card.code}>
            <Card className={classCard(card)}>
              <Card.Content>
                <Media>
                  <Media.Item>
                    <Heading size={4}>{card.name}</Heading>
                    <Heading subtitle size={6}>
                      {card.code}
                    </Heading>
                  </Media.Item>
                  <Media.Item renderAs="figure" position="right">
                    <Button remove onClick={() => deleteCard(card.code)}/>
                  </Media.Item>
                </Media>
                <Content>
                  <strong>{card.err}</strong><br />
                  <em>{card.fine}</em>
                </Content>
              </Card.Content>
            </Card>
          </Columns.Column>
    )
  }

  return (
    <Columns>
      {cards.map((card) => renderCard(card))}
    </Columns>
  )
}

export default CardList
