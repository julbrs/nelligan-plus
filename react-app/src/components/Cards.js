import React, { useState } from "react";
import CardAdd from "./CardAdd";
import Card from "./Card";
import BarCodeCard from "./BarCodeCard";
import { API } from "aws-amplify";

const Cards = ({ cards, setCards }) => {
  const [barcode, setBarCode] = useState(null);

  const deleteCard = (card) => {
    // delete card from context and persist it
    API.del("main", `/cards/${card.id}`).then((data) =>
      setCards(cards.filter((crd) => crd.id !== card.id))
    );
  };

  const addCard = (card) => {
    // add card to context and persist it
    API.post("main", "/cards", { body: card }).then((data) =>
      setCards([data, ...cards])
    );
  };

  if (barcode) {
    return <BarCodeCard value={barcode} setBarCode={setBarCode} />;
  } else {
    return (
      <div className="mt-4">
        <div className="text-3xl font-extrabold text-blue-900">
          {cards.length} cards
        </div>
        <hr className="mb-4" />
        <p className="italic text-gray-600 text-sm text-right mb-2">
          Press a card icon to get the barcode. Delete a card with the cross
          icon.
        </p>
        <div className="flex flex-col md:flex-row flex-wrap gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              deleteCard={() => deleteCard(card)}
              setBarCode={setBarCode}
            />
          ))}
          <CardAdd addCard={addCard} />
        </div>
      </div>
    );
  }
};

export default Cards;
