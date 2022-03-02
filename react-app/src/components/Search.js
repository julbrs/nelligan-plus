import React, { useState, useEffect } from "react";
import Book from "./Book";
import { API } from "aws-amplify";
import BookLoading from "./BookLoading";

const Books = ({ cards }) => {
  return (
    <div className="mt-4">
      <div className="text-3xl font-extrabold text-blue-900">
        Search book on Nelligan catalog!
      </div>
      <input
        className="w-full my-4 p-2 text-lg font-mono text-gray-700 border-gray-200 border-2 rounded-sm"
        placeholder="toto"
        type="text"
      />
      <hr className="mb-4" />
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4"></div>
    </div>
  );
};

export default Books;
