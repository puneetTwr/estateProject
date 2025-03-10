import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart);
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      console.log(data);
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.log(error);
    }
  };
  return (
    <div className="p-3 ">
      <h1 className="text-xl text-center font-bold my-7">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg w-1/2"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg w-1/2"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg w-1/4 hover:opacity-85 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div>
        <p className="text-center my-4">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </p>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default SignIn;
