import React, { useState, useEffect } from "react";
import Warning from "./alerts/Warning";
import Info from "./alerts/Info";
import { API } from "aws-amplify";

const Book = (props) => {
  const [bookInfo, setBookInfo] = useState({});
  const [error, setError] = useState();
  const [renew, setRenew] = useState();
  const [imageError, setImageError] = useState();
  const { book, canRefresh } = props;

  useEffect(
    () => {
      API.get("main", `/books/${book.record}`).then((data) => {
        if (data.summary) {
          data.summary = `${data.summary.substring(0, 100)}...`;
        }
        setBookInfo(data);
      });
    },
    [book] /* refresh only if book is changing not bookInfo ! */
  );

  const renderImage = () => {
    if (typeof bookInfo.thumb !== "undefined" && !imageError) {
      return (
        <img
          alt="thumb"
          onError={() => setImageError(true)}
          className="object-cover w-full h-24 opacity-25 hover:opacity-100 transform hover:scale-105"
          src={bookInfo.thumb}
        />
      );
    } else {
      return (
        <svg
          className="object-cover w-full h-24 opacity-25"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    }
  };

  const handleRenew = () => {
    API.post("main", `/cards/${book.card.id}/books/renew`, { body: book })
      .then((data) => {
        setRenew("renewed! " + data.date);
      })
      .catch((err) => {
        // if error during renew
        setError(err.response.data.msg);
      });
  };

  return (
    <div className="w-full md:w-64 md:h-64 rounded shadow-lg overflow-hidden relative">
      {renderImage()}
      <div className="px-2">
        <div className="font-bold mb-2">{book.title}</div>
        <div className="font-bold mb-2">
          {book.duedate} - {book.card.name}
        </div>
        {error && <Warning text={error} />}
        {renew && <Info text={renew} />}
        <p className="text-gray-600 text-sm">{bookInfo.summary}</p>
      </div>
      {canRefresh && (
        <svg
          className="h-6 w-6 text-gray-800 mr-2 mt-2 absolute top-0 right-0 cursor-pointer hover:text-black"
          onClick={handleRenew}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
};

export default Book;
