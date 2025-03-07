import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 ">
      <h1 className="text-xl text-center font-bold my-7">Sign Up</h1>
      <form className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg w-1/2"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg w-1/2"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg w-1/2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg w-1/4 hover:opacity-85 disabled:opacity-50"
        >
          Sign Up
        </button>
      </form>
      <div>
        <p className="text-center my-4">
          Already have an account?{" "}
          <Link to="/signin">
            <span className="text-blue-500">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
