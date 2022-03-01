import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useParams } from "react-router-dom";

const History = () => {
  const [books, setBooks] = useState([]);
  const { card } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await API.get("main", `/cards/${card}/history`);
        setBooks(
          data.history.sort((a, b) => {
            if (a.checkedout < b.checkedout) {
              return 1;
            } else {
              return -1;
            }
          })
        );
      } catch (err) {
        // if error during books call then return an empty array
        return [];
      }
    };
    getData();
  }, [card]);

  return (
    <div className="mt-4">
      <div className="text-3xl font-extrabold text-blue-900">
        last {books.length} books
      </div>
      <hr className="mb-4" />
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Author
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, item) => (
                    <tr
                      key={item}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                        {book.title}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {book.checkedout}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {book.author}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
