import React from "react";
import { BsGoogle } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import {
  useSignInWithGoogle,
  useSignInWithFacebook,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Login = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithFacebook] = useSignInWithFacebook(auth);

  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Chat House</h2>
        <div
          onClick={() => signInWithGoogle("", { prompt: "select_account" })}
          className="login-button google"
        >
          <BsGoogle /> Sign In with Google
        </div>
        <br /> <br />
        <div
          onClick={() => signInWithFacebook("", { prompt: "select_account" })}
          className="login-button facebook"
        >
          <BsFacebook /> Sign In with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
