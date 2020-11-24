import React, { useState, useEffect } from "react";
import axios from "axios";
const api = process.env.REACT_APP_API;

const Book = (props) => {
  const [bookInfo, setBookInfo] = useState({});
  const [error, setError] = useState();
  const [imageError, setImageError] = useState();
  const { book } = props;

  useEffect(
    () => {
      axios.get(`${api}book/${book.record}`).then((res) => {
        setBookInfo(res.data);
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
    // TODO handle renew !
    axios
      .get(`${api}book/renew/${book.barcode}`, {
        params: {
          code: book.card.code,
          pin: book.card.pin,
          rid: book.rid,
          rvalue: book.rvalue,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        // if error during renew
        setError(err.response.data.msg);
      });
  };

  const getStatus = () => {
    if (book.err !== undefined) {
      return "error";
    }
    var todayPlusFewDays = new Date();
    todayPlusFewDays.setDate(todayPlusFewDays.getDate() + 3);
    var duedate = new Date("20" + book.duedate);
    if (todayPlusFewDays > duedate) {
      return "warning";
    }
  };

  return (
    <div className="w-full md:w-64 md:h-64 rounded shadow-lg overflow-hidden">
      {renderImage()}
      <div className="px-2">
        <div className="font-bold mb-2">{book.title}</div>
        <div className="font-bold mb-2">
          {book.duedate} - {book.card.name}
        </div>
        <p className="text-gray-600 text-sm">{bookInfo.summary}</p>
      </div>
    </div>
  );
};

export default Book;
