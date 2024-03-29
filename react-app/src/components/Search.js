import React, { useState } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";

const Search = ({ cards }) => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await API.post("main", "/search", { body: { search } });
    setBooks(data);
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <div className="text-3xl font-extrabold text-blue-900">
        Search book on Nelligan catalog!
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          className="w-8/12 my-4 p-2 text-lg font-mono text-gray-700 border-gray-200 border-2 rounded-sm"
          placeholder="Type keyword..."
          type="text"
        />
        <button className="w-4/12 pl-4 border-gray-200 border-2 rounded-sm my-4 p-2 font-mono text-lg">
          Search
        </button>
      </form>

      <hr className="mb-4" />
      {loading && <div>Loading...</div>}
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
                      Type
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Action
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
                        <div className="text-gray-500 font-light italic text-xs">
                          {book.resume}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {book.type}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {book.type === "Book" && (
                          <Link
                            to={`/books/${book.record}`}
                            className="border-gray-200 border-2 rounded-sm my-4 p-2"
                          >
                            More info!
                          </Link>
                        )}
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

export default Search;
