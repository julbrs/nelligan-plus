import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";

const User = () => {
  const { user } = useContext(UserContext);
  const { displayName } = user;
  return (
    <div>
      <div className="text-3xl font-extrabold text-blue-900">User</div>
      <hr className="mb-4" />
      <svg
        className="h-24 w-24 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <div>{displayName}</div>
      <svg
        className="h-6 w-6 text-gray-500 cursor-pointer"
        onClick={() => {
          auth.signOut();
        }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>

      <div></div>
    </div>
  );
};
export default User;
