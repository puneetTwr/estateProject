import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { initializeApp } from "firebase/app";
import app from "../firebase";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async (params) => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const user = result.user;

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
