import React, { useContext, useState, useEffect } from "react";
import Book from "./Book";
import { UserContext } from "../providers/UserProvider";
import axios from "axios";

const api = process.env.REACT_APP_API;

const Holds = () => {
  const { user } = useContext(UserContext);
  const { cards } = user;
  const [books, setBooks] = useState([]);

  useEffect(
    () => {
      Promise.all(
        cards
          // remove card in error or with fine to avoid reaction loop
          .filter((c) => c.error === undefined)
          .filter((c) => c.fine === undefined)
          .map((card) =>
            axios
              .get(`${api}hold`, {
                params: {
                  code: card.code,
                  pin: card.pin,
                },
              })
              .then((res) => {
                // add card info to the book
                return res.data.hold.map((book) => {
                  book.card = card;
                  book.duedate = book.pickup;
                  return book;
                });
              })
              .catch((err) => {
                // if error during books call then return an empty array
                return [];
              })
          )
      ).then((data) => {
        // flatten and order by due-date the list after

        setBooks(
          data.flat().sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            } else {
              return -1;
            }
          })
        );
      });
    },
    [cards] /* refresh only if cards is changing not books ! */
  );

  return (
    <div className="mt-4">
      <div className="text-3xl font-extrabold text-blue-900">
        {books.length} holds
      </div>
      <hr className="mb-4" />
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
        {books.map((book) => (
          <Book key={book.barcode} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Holds;
