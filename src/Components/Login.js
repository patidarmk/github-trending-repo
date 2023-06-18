import React from "react";
import githubsvg from "../assets/github-svgrepo.svg";
import { Button, Stack } from "react-bootstrap";

const Login = () => {
  const handleLogin = () => {
    const clientId = "15e92c4ed83be9db448d";
    const redirectUri = "https://x9l2cm.csb.app/home";
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  return (
    <div className="login-container">
      <div className="glass box">
        <img className="svg-icon" src={githubsvg} alt="git-icon" />
        <button className="button-3" onClick={handleLogin}>
          Login with Github
        </button>
      </div>
    </div>
  );
};

export default Login;
