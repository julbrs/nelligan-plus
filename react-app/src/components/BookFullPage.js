import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import Warning from "./alerts/Warning";
import Info from "./alerts/Info";

const ReserveBlock = ({ cards, record }) => {
  const [error, setError] = useState();
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(false);

  const [cardId, setCardId] = useState(cards[0].id);

  const handleClick = async () => {
    setInfo(null);
    setError(null);
    setLoading(true);
    try {
      const data = await API.post("main", `/books/reserve/${cardId}`, {
        body: { record },
      });
      setInfo(data.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
      setLoading(false);
    }
  };

  const handleSelect = (e) => {
    setCardId(e.target.value);
  };

  return (
    <>
      {error && <Warning text={error} />}
      {info && <Info text={info} />}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <select
            onChange={handleSelect}
            className="border-gray-200 bg-transparent border-2 rounded-sm my-1 px-2 h-12"
          >
            {cards.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleClick}
            className="border-gray-200 border-2 rounded-sm my-1 px-2 h-12 ml-2"
          >
            Reserve!
          </button>
        </>
      )}
    </>
  );
};

const BookFullPage = ({ cards }) => {
  let { record } = useParams();
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState();
  const [bookInfo, setBookInfo] = useState({});

  useEffect(
    () => {
      API.get("main", `/books/${record}`).then((data) => {
        setBookInfo(data);
        setLoading(false);
      });
    },
    [record] /* refresh only if record is changing! */
  );

  const renderImage = () => {
    if (typeof bookInfo.thumb !== "undefined" && !imageError) {
      return (
        <img
          alt="thumb"
          onError={() => setImageError(true)}
          className="object-cover w-full "
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

  return (
    <div className="flex">
      <div className="w-4/12">{renderImage()}</div>
      <div className="w-8/12">
        {loading ? (
          <div className="pl-2 sm:pl-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 mt-4 bg-gray-200 rounded"></div>
            <div className="h-4 mt-4 bg-gray-200 rounded"></div>
            <div className="h-4 mt-4 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <div className="pl-2 sm:pl-6">
            <div className="font-bold mb-2">{bookInfo.title}</div>
            {cards && cards.length > 0 ? (
              <ReserveBlock cards={cards} record={record} />
            ) : (
              <Info text="Add at least one card to be able to reserve this book!" />
            )}
            <div className="mb-2">
              <p>
                <strong>ISBN: </strong>
                {bookInfo.isbn}
              </p>
              <p>
                <strong>Publication: </strong>
                {bookInfo.pub}
              </p>
            </div>
            {bookInfo.summary && (
              <p className="text-gray-600 text-sm">
                <strong>Summary: </strong>
                {bookInfo.summary}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookFullPage;
