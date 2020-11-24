import React from "react";
import { signInWithGoogle } from "../firebase";

const SignIn = () => {

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        <button
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
          onClick = {signInWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
export default SignIn;