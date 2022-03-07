import React, { useEffect, useState } from "react";
import { useInput } from "../hooks/input";
import { API } from "aws-amplify";

const CardAdd = (props) => {
  const [libraries, setLibraries] = useState([{ value: "loading..." }]);
  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const { value: code, bind: bindCode, reset: resetCode } = useInput("");
  const { value: pin, bind: bindPin, reset: resetPin } = useInput("");
  const { value: library, bind: bindLibrary } = useInput("");
  const { addCard } = props;

  useEffect(() => {
    API.get("main", `/libraries`).then((data) => setLibraries(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code === undefined || code === "") {
      return;
    }
    addCard({
      name,
      code,
      pin,
      library,
    });

    resetName();
    resetCode();
    resetPin();
  };

  return (
    <div className="w-full md:w-64 rounded overflow-hidden shadow-lg">
      <div className="bg-white px-6 py-4">
        <form className="bg-white">
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 py bg"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="bob"
              {...bindName}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 py bg"
              htmlFor="code"
            >
              Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="code"
              type="text"
              placeholder="127773906xxxxx"
              {...bindCode}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 bg"
              htmlFor="pin"
            >
              Pin
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="pin"
              type="password"
              placeholder="****"
              {...bindPin}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 bg"
              htmlFor="pin"
            >
              Library for new holds
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="library"
              name="library"
              {...bindLibrary}
            >
              {libraries.map((lib, i) => (
                <option key={i} value={lib.code}>
                  {lib.value}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Add new card!
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardAdd;
