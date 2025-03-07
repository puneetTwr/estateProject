import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  return (
    <header className="bg-slate-200 p-4 flex justify-between items-center shadow-md">
      <Link to="/">
        <h1 className="font-bold text-3xl flex flex-wrap">
          <span className="text-slate-400">My</span>
          <span className="text-slate-800">Estate</span>
        </h1>
      </Link>
      <form className="bg-slate-100 p-2 rounded-lg flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none w-24 sm:w-64"
        />
        <FaSearch className="text-slate-400" />
      </form>
      <ul className="flex gap-4">
        <Link to="/">
          <li className="hidden sm:inline text-slate-800 hover:underline">
            Home
          </li>
        </Link>
        <Link to="/about">
          <li className="hidden sm:inline text-slate-800 hover:underline">
            About
          </li>
        </Link>
        <Link to="/signin">
          <li className=" text-slate-800 hover:underline">Sign In</li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
