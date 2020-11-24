import React from "react";
import { useInput } from "../hooks/input";

//import {CardsContext} from './context'

const CardAdd = (props) => {
  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const { value: code, bind: bindCode, reset: resetCode } = useInput("");
  const { value: pin, bind: bindPin, reset: resetPin } = useInput("");
  const { addCard } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code === undefined || code === "") {
      return;
    }
    addCard({
      name,
      code,
      pin,
    });

    resetName();
    resetCode();
    resetPin();
  };

  return (
    <div className="w-full md:w-64 rounded overflow-hidden shadow-lg">
      <div className="bg-white px-6 py-4">
        <form className="bg-white">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 py bg"
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 py bg"
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
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 bg"
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
