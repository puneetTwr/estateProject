import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log(data);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="p-3 ">
      <h1 className="text-xl text-center font-bold my-7">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg w-1/2"
          onChange={handleChange}
          required
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
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
