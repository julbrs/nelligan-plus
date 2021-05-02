import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import CardAdd from "./CardAdd";
import Card from "./Card";
import BarCodeCard from "./BarCodeCard";
import ReactGA from "react-ga";

const Cards = () => {
  const { user, saveCards } = useContext(UserContext);
  const { cards } = user;
  const [barcode, setBarCode] = useState(null);

  const deleteCard = (card) => {
    // delete card from context and persist it
    saveCards(cards.filter((crd) => crd.code !== card.code));
    ReactGA.event({
      category: "Card",
      action: "Remove card",
    });
  };

  const addCard = (card) => {
    // add card to context and persist it
    saveCards([...cards, card]);
    ReactGA.event({
      category: "Card",
      action: "New card",
    });
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
        <div className="flex flex-col md:flex-row flex-wrap gap-4">
          {cards.map((card) => (
            <Card
              key={card.code}
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
