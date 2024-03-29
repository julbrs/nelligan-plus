import React, { useState, useEffect } from "react";
import Book from "./Book";
import { API } from "aws-amplify";
import BookLoading from "./BookLoading";

const Holds = ({ cards }) => {
  const [books, setBooks] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(
    () => {
      if (!cards) {
        return;
      }
      Promise.all(
        cards
          // remove card in error to avoid reaction loop
          .filter((c) => c.error === undefined)
          .map(async (card) => {
            try {
              const data = await API.get("main", `/cards/${card.id}/holds`);
              return data.hold.map((book) => {
                book.card = card;
                book.duedate = book.pickup;
                return book;
              });
            } catch (err) {
              return [];
            }
          })
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
        isLoading(false);
      });
    },
    [cards] /* refresh only if cards is changing not books ! */
  );
  if (loading) {
    return (
      <div className="mt-4">
        <div className="text-3xl font-extrabold text-gray-400 italic">
          loading...
        </div>
        <hr className="mb-4" />
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
          <BookLoading />
          <BookLoading />
          <BookLoading />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-4">
        <div className="text-3xl font-extrabold text-blue-900">
          {books.length} holds
        </div>
        <hr className="mb-4" />
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
          {books.map((book, i) => (
            <Book key={i} book={book} />
          ))}
        </div>
      </div>
    );
  }
};

export default Holds;
