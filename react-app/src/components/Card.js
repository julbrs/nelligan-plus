import React, { useEffect, useState } from "react";
import Warning from "./alerts/Warning";
import Info from "./alerts/Info";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { card, deleteCard, setBarCode } = props;
  const [fine, setFine] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    API.get("main", `/cards/${card.id}/books`)

      .then((data) => {
        // get fine
        if (data.fine !== "") {
          setFine(data.fine);
        }
      })
      .catch((err) => {
        // if error during books call then set error flag
        setError(true);
      });
  }, [card]);

  return (
    <div className="w-full md:w-64 rounded shadow-lg px-6 py-4 relative">
      <svg
        className="h-24 w-24 text-gray-500 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => setBarCode(card.code)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
      <div className="font-bold text-xl mb-2">{card.name}</div>
      <div className="text-l italic mb-2">[{card.code}]</div>
      <div className="text-l italic mb-2">[{card.library}]</div>
      <p className="text-gray-600 text-sm">
        Card{" "}
        <Link
          className="font-bold hover:text-gray-900"
          to={`/cards/${card.id}/history`}
        >
          history 🦖
        </Link>
        .
      </p>
      <p className="text-gray-600 text-sm">
        Card{" "}
        <Link
          className="font-bold hover:text-gray-900"
          to="#"
          title="not yet..."
        >
          recommendations 🏆
        </Link>
        (based on your previous reading).
      </p>
      {error && <Warning text="This card have wrong credential. Remove it !" />}
      {fine && <Info text={fine} />}
      <svg
        className="h-6 w-6 text-gray-500 mr-4 mt-6 absolute top-0 right-0 cursor-pointer"
        onClick={deleteCard}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default Card;
